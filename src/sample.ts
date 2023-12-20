import { Vector2 } from "./math/vector2";
import { Vector4 } from "./math/vector4";

export const sample2D = (diffuse: ImageData, uv: Vector2) => {
  const { x: u, y: v } = uv;
  const w = diffuse.width;
  const h = diffuse.height;
  const x = Math.round(w * u);
  const y = Math.round(h * (1 - v));
  const i = (y * w + x) * 4;
  const data = diffuse.data;

  return new Vector4(data[i], data[i + 1], data[i + 2], data[i + 3]);
};
