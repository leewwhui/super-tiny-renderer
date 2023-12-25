import { Vector2 } from "./math/vector2";
import { Vector4 } from "./math/vector4";

export class FrameBuffer {
  public readonly buffer: Float32Array;
  private readonly width: number;

  public constructor(width: number, height: number) {
    this.width = width;
    this.buffer = new Float32Array(width * height * 4);
  }

  public setColor(point: Vector2, rgba: Vector4) {
    const { x, y } = point;
    const index = x + y * this.width;
    this.buffer[index * 4] = rgba.x;
    this.buffer[index * 4 + 1] = rgba.y;
    this.buffer[index * 4 + 2] = rgba.z;
    this.buffer[index * 4 + 3] = rgba.w;
  }

  public mutateToCanvas(context: CanvasRenderingContext2D) {
    const width = context.canvas.width;
    const height = context.canvas.height;

    const imageData = context.getImageData(0, 0, width, height);

    for (let i = 0; i < this.buffer.length; i++) {
      imageData.data[i] = this.buffer[i];
    }

    context.putImageData(imageData, 0, 0);
  }
}
