import diablo from "../resources/diablo3_pose.obj?raw";
import diabloDiffuse from "../resources/diablo3_pose_diffuse.png";
import diabloNomal from "../resources/diablo3-pose-nm.png";
import { FrameBuffer } from "./framebuffer";
import { barcentric } from "./math/barycentric";
import { Vector2 } from "./math/vector2";
import { Model } from "./model";
import { Shader } from "./shader";
import { utils } from "./utils";
import { ZBuffer } from "./zBuffer";
import { imageLoader } from "./imageLoader";
import { sample2D } from "./sample";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

const main = (model: Model) => {
  const framebuffer = new FrameBuffer(canvas.width, canvas.height);
  const zbuffer = new ZBuffer();
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

        const position = barcentric.interpolateVector3(clip_verts, barycenter);

        if (!zbuffer.zTest(point, position.z)) continue;
        zbuffer.setDeep(point, position.z);

        const uv = barcentric.interpolateVector2(model.uvs(face), barycenter);
        const normal = sample2D(model.normalMap, uv).mul(2).sub(1);

        const v2f = { uv, normal };

        const color = shader.fragment(model, v2f);
        framebuffer.setColor(point, color);
      }
    }
  });

  framebuffer.mutateToCanvas(context);
};

imageLoader([
  { key: "diablo", src: diabloDiffuse },
  { key: "diablo_normal", src: diabloNomal },
]).then((val) => {
  //@ts-ignore
  const diabloImage = val["diablo"];
  //@ts-ignore
  const diabloNormalImage = val["diablo_normal"];

  main(new Model(diablo, diabloImage, diabloNormalImage));
});
