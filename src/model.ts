import { Face } from "obj-file-parser";
import ObjFileParser from "obj-file-parser";
import { Vector3 } from "./math/vector3";
import { Vector2 } from "./math/ vector2";
import { PrimitiveVertexs } from "./type";

export class Model {
  vertices: Vector3[] = [];
  faces: Face[] = [];
  textures: Vector2[] = [];

  constructor(content: string) {
    const parser = new ObjFileParser(content);
    const output = parser.parse();

    if (output.models[0]) {
      const { vertices, faces, textureCoords } = output.models[0];
      this.vertices = vertices.map((v) => new Vector3(v.x, v.y, v.z));
      this.textures = textureCoords.map((t) => new Vector2(t.u, t.v));
      this.faces = faces;
    }
  }

  vert(i: number) {
    return this.vertices[i];
  }

  verts(face: Face): PrimitiveVertexs {
    const [v0, v1, v2] = face.vertices;
    return [
      this.vertices[v0.vertexIndex - 1],
      this.vertices[v1.vertexIndex - 1],
      this.vertices[v2.vertexIndex - 1],
    ];
  }
}
