import diablo from "../resources/diablo3_pose.obj?raw";
import { Model } from "./model";
import { Shader } from "./shader";
import { Triangle } from "./type";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const main = (model: Model) => {
  const shader = new Shader(model, canvas);
  const { faces } = model;

  faces.forEach((face) => {
    const clip_verts = model.verts(face).map(shader.vertex) as Triangle;
    shader.fragment(clip_verts);
  });
};

main(new Model(diablo));
