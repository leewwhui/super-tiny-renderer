import diablo from "../resources/diablo3_pose.obj?raw";
import { Model } from "./model";
import { triangle } from "./triangle";
import { PrimitiveVertexs } from "./type";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

const main = (model: Model) => {
  const { faces } = model;

  faces.forEach((face) => {
    const clip_verts = model.verts(face) as PrimitiveVertexs;
    triangle(clip_verts, context);
  });
};

main(new Model(diablo));
