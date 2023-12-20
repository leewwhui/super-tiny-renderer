import { Vector2 } from "./math/vector2";
import { Model } from "./model";
import { sample2D } from "./sample";

interface V2FInterface {
  uv: Vector2;
}

export class Shader {
  vertex = () => {};

  fragment = (model: Model, v2f: V2FInterface) => {
    const color = sample2D(model.diffuseMap, v2f.uv);
    return color;
  };
}
