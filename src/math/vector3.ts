export class Vector3 {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public mul(vec4: Vector3 | number): Vector3 {
    const out = new Vector3(this.x, this.y, this.z);
    if (vec4 instanceof Vector3) {
      out.x = this.x * vec4.x;
      out.y = this.y * vec4.y;
      out.z = this.z * vec4.z;
    } else if (typeof vec4 === "number") {
      out.x = this.x * vec4;
      out.y = this.y * vec4;
      out.z = this.z * vec4;
    }
    return out;
  }

  public add(vec4: Vector3 | number): Vector3 {
    const out = new Vector3(this.x, this.y, this.z);
    if (vec4 instanceof Vector3) {
      out.x = this.x + vec4.x;
      out.y = this.y + vec4.y;
      out.z = this.z + vec4.z;
    } else if (typeof vec4 === "number") {
      out.x = this.x + vec4;
      out.y = this.y + vec4;
      out.z = this.z + vec4;
    }
    return out;
  }
}
