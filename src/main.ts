import diablo from "../resources/diablo3_pose.obj?raw";
import { Vector3 } from "./math/vector3";
import { Model } from "./model";
import { Shader } from "./shader";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const main = (model: Model) => {
  const shader = new Shader(model, canvas);
  const { faces } = model;

  faces.forEach((face) => {
    const clip_verts = model.verts(face).map((v) => {
      return shader.vertex(v);
    }) as [Vector3, Vector3, Vector3];

    shader.fragment(clip_verts);
  });
};

main(new Model(diablo));
