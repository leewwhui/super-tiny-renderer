import { Vector2 } from "./math/vector2";

export class ZBuffer {
  public buffer: Map<string, number> = new Map();

  setDeep(point: Vector2, deep: number) {
    this.buffer.set(`${point.x}-${point.y}`, deep);
  }

  zTest(point: Vector2, deep: number) {
    if (deep < -1 || deep > 1) return false;
    const key = `${point.x}-${point.y}`;
    if (!this.buffer.has(key)) return true;
    const value = this.buffer.get(key)!;
    return value < deep;
  }
}
