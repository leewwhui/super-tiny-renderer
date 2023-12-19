import { Vector3 } from "./math/vector3";
import { PrimitiveVertexs } from "./type";

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

export const triangle = (
  clip_verts: PrimitiveVertexs,
  context: CanvasRenderingContext2D
) => {
  const [v0, v1, v2] = transformToScreen(clip_verts, context.canvas);
  context.beginPath();
  context.strokeStyle = "black";
  context.moveTo(v0.x, v0.y);
  context.lineTo(v1.x, v1.y);
  context.lineTo(v2.x, v2.y);
  context.closePath();
  context.stroke();
};
