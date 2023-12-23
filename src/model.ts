import { Face } from "obj-file-parser";
import ObjFileParser from "obj-file-parser";
import { Vector3 } from "./math/vector3";
import { ThreeVector2, ThreeVector3 } from "./type";
import { Vector2 } from "./math/vector2";

export class Model {
  vertices: Vector3[] = [];
  faces: Face[] = [];
  textures: Vector2[] = [];
  vertexNormals: Vector3[] = [];

  diffuseMap: ImageData;

  constructor(content: string, diffuseMap: HTMLImageElement) {
    const parser = new ObjFileParser(content);
    const output = parser.parse();

    if (output.models[0]) {
      const { vertices, faces, textureCoords, vertexNormals } =
        output.models[0];
      this.vertices = vertices.map((v) => new Vector3(v.x, v.y, v.z));
      this.textures = textureCoords.map((t) => new Vector2(t.u, t.v));
      this.vertexNormals = vertexNormals.map((n) => new Vector3(n.x, n.y, n.z));
      this.faces = faces;
    }

    const canvas = document.createElement("canvas");
    canvas.width = diffuseMap.width;
    canvas.height = diffuseMap.height;
    const context = canvas.getContext("2d")!;
    context.drawImage(diffuseMap, 0, 0, canvas.width, canvas.height);
    this.diffuseMap = context.getImageData(0, 0, canvas.width, canvas.height);
  }

  vert(i: number) {
    return this.vertices[i];
  }

  verts(face: Face): ThreeVector3 {
    const [v0, v1, v2] = face.vertices;
    return [
      this.vertices[v0.vertexIndex - 1],
      this.vertices[v1.vertexIndex - 1],
      this.vertices[v2.vertexIndex - 1],
    ];
  }

  uvs(face: Face): ThreeVector2 {
    const [v0, v1, v2] = face.vertices;
    return [
      this.textures[v0.textureCoordsIndex - 1],
      this.textures[v1.textureCoordsIndex - 1],
      this.textures[v2.textureCoordsIndex - 1],
    ];
  }

  normals(face: Face): ThreeVector3 {
    const [v0, v1, v2] = face.vertices;
    return [
      this.vertexNormals[v0.vertexNormalIndex - 1],
      this.vertexNormals[v1.vertexNormalIndex - 1],
      this.vertexNormals[v2.vertexNormalIndex - 1],
    ];
  }
}
