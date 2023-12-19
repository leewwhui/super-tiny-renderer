import { Vector4 } from "./math/vector4";

export class Shader {
  vertex = () => {};

  fragment = () => {
    return new Vector4(0, 0, 0, 255);
  };
}
