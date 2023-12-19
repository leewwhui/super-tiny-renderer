import diablo from "../resources/diablo3_pose.obj?raw";
import { Vector3 } from "./math/vector3";
import { Model } from "./model";
import { triangle } from "./triangle";
import { PrimitiveVertexs } from "./type";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

export const isCCW = (p0: Vector3, p1: Vector3, p2: Vector3) => {
  const area = (p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y);
  return area / 2 > 0;
}

const main = (model: Model) => {
  model.faces.forEach((face) => {
    const clip_verts = model.verts(face) as PrimitiveVertexs;
    if (!isCCW(...clip_verts)) return;
    triangle(clip_verts, context);
  });
};

main(new Model(diablo));
