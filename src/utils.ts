import { Vector3 } from "./math/vector3";
import { BouondingBox, PrimitiveVertexs } from "./type";

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
  }) as PrimitiveVertexs;
};

const createBoundingBox = (positions: PrimitiveVertexs): BouondingBox => {
  const fromX = Math.min(positions[0].x, positions[1].x, positions[2].x);
  const toX = Math.max(positions[0].x, positions[1].x, positions[2].x);

  const fromY = Math.min(positions[0].y, positions[1].y, positions[2].y);
  const toY = Math.max(positions[0].y, positions[1].y, positions[2].y);

  return {
    x: Math.round(fromX),
    y: Math.round(fromY),
    w: Math.round(toX),
    z: Math.round(toY),
  };
};

const isCCW = (p0: Vector3, p1: Vector3, p2: Vector3) => {
  const area = (p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y);
  return area / 2 > 0;
};

export const utils = {
  transformToScreen,
  createBoundingBox,
  isCCW,
};
