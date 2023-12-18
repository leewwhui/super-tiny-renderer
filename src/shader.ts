import { Vector3 } from "./math/vector3";
import { Model } from "./model";

export class Shader {
  model: Model;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(model: Model, canvas: HTMLCanvasElement) {
    this.model = model;
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
  }

  vertex(v: Vector3) {
    const { x, y, z } = v;
    const width = this.canvas.width;
    const height = this.canvas.height;

    return new Vector3(
      (x * width) / 2 + width / 2,
      (-y * height) / 2 + height / 2,
      z
    );
  }

  fragment(vertexs: [Vector3, Vector3, Vector3]) {
    const [v0, v1, v2] = vertexs;
    const context = this.context;
    context.beginPath();
    context.fillStyle = 'black';
    context.moveTo(v0.x, v0.y);
    context.lineTo(v1.x, v1.y);
    context.lineTo(v2.x, v2.y);
    context.closePath();
    context.fill();
  }
}
