import { dot, normalize } from "./math/common";
import { Vector2 } from "./math/vector2";
import { Vector3 } from "./math/vector3";
import { Vector4 } from "./math/vector4";
import { Model } from "./model";
import { sample2D } from "./sample";

interface V2FInterface {
  uv: Vector2;
  normal: Vector3;
}

const LIGHT_DIR = new Vector3(1, 1, 1);
const AMBIENT = new Vector3(0.5, 0.5, 0.5);
const LIGHT_COLOR = new Vector3(1, 1, 1);

export class Shader {
  vertex = () => {};

  fragment = (model: Model, v2f: V2FInterface) => {
    const { uv, normal } = v2f;

    const texture_color = sample2D(model.diffuseMap, uv);

    const worldLightDir = normalize(LIGHT_DIR);

    const diffuse = LIGHT_COLOR.mul(
      Math.max(0, dot(worldLightDir, normalize(normal)))
    );

    const color = texture_color.mul(AMBIENT.add(diffuse)).mul(255);

    return new Vector4(color.x, color.y, color.z, 255);
  };
}
