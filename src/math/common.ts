import { Vector2 } from "./vector2";
import { Vector3 } from "./vector3";

export const dot = (a: Vector2 | Vector3, b: Vector2 | Vector3): number => {
  if (a instanceof Vector3 && b instanceof Vector3) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  } else if (a instanceof Vector2 && b instanceof Vector2) {
    return a.x * b.x + a.y * b.y;
  }
  console.error("glsl dot param error");
  return 0;
};

export const normalize = (vector: Vector3) => {
  const { x, y, z } = vector;
  let len = x * x + y * y + z * z;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }
  return new Vector3(x * len, y * len, z * len);
};

export const mul = (v1: Vector3, v2: Vector3) => {
  return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
}
