import { Vector3 } from "./math/vector3";
import { PrimitiveVertexs } from "./type";

const isCCW = (p0: Vector3, p1: Vector3, p2: Vector3) => {
  const area = (p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y);
  return area / 2 > 0;
};


const transformToScreen = (
  clip_vertes: PrimitiveVertexs,
  canvas: HTMLCanvasElement
) => {
  const width = canvas.width;
  const height = canvas.height;

  const h_width = width / 2;
  const h_height = height / 2;

  return clip_vertes.map((vertex) => {
    const { x, y, z } = vertex;
    return new Vector3(x * h_width + h_width, -y * h_height + h_height, z);
  });
};

export const utils = { transformToScreen, isCCW }