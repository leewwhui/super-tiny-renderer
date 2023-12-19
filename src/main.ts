import diablo from "../resources/diablo3_pose.obj?raw";
import { Model } from "./model";
import { PrimitiveVertexs } from "./type";
import { utils } from "./utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

const main = (model: Model) => {
  model.faces.forEach((face) => {
    const clip_verts = model.verts(face) as PrimitiveVertexs;
    if (!utils.isCCW(...clip_verts)) return;
    const [v0, v1, v2] = utils.transformToScreen(clip_verts, context.canvas);
    context.beginPath();
    context.strokeStyle = "black";
    context.moveTo(v0.x, v0.y);
    context.lineTo(v1.x, v1.y);
    context.lineTo(v2.x, v2.y);
    context.closePath();
    context.stroke();
  });
};

main(new Model(diablo));
