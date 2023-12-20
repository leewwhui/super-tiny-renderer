import diablo from "../resources/diablo3_pose.obj?raw";
import diabloDiffuse from "../resources/diablo3_pose_diffuse.png";
import { FrameBuffer } from "./framebuffer";
import { barcentric } from "./math/barycentric";
import { Vector2 } from "./math/vector2";
import { Model } from "./model";
import { Shader } from "./shader";
import { utils } from "./utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

const main = (model: Model) => {
  const framebuffer = new FrameBuffer(canvas.width, canvas.height);
  const shader = new Shader();

  model.faces.forEach((face) => {
    const clip_verts = model.verts(face);

    if (!utils.isCCW(...clip_verts)) return;

    const vertexs = utils.transformToScreen(clip_verts, canvas);
    const boundingbox = utils.createBoundingBox(vertexs);

    for (let x = boundingbox.x; x <= boundingbox.w; x++) {
      for (let y = boundingbox.y; y <= boundingbox.z; y++) {
        const point = new Vector2(x, y);
        const barycenter = barcentric.barycenter(vertexs, point);

        if (barycenter.x < 0 || barycenter.y < 0 || barycenter.z < 0) continue;

        const uv = barcentric.interpolateVector2(model.uvs(face), barycenter);

        const v2f = { uv };

        const color = shader.fragment(model, v2f);
        framebuffer.setColor(point, color);
      }
    }
  });

  framebuffer.mutateToCanvas(context);
};

const diabloTexture = new Image();
diabloTexture.src = diabloDiffuse;

diabloTexture.onload = (e) => {
  main(new Model(diablo, e.target as HTMLImageElement));
};
