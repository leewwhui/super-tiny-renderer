import { ThreeVector3 } from "../type";
import { Vector2 } from "./vector2";
import { Vector3 } from "./vector3";

const barycenter = (vertexs: ThreeVector3, point: Vector2) => {
  const [va, vb, vc] = vertexs;
  const a =
    (-(point.x - vb.x) * (vc.y - vb.y) + (point.y - vb.y) * (vc.x - vb.x)) /
    (-(va.x - vb.x) * (vc.y - vb.y) + (va.y - vb.y) * (vc.x - vb.x));

  const b =
    (-(point.x - vc.x) * (va.y - vc.y) + (point.y - vc.y) * (va.x - vc.x)) /
    (-(vb.x - vc.x) * (va.y - vc.y) + (vb.y - vc.y) * (va.x - vc.x));

  const c = 1 - a - b;

  return new Vector3(a, b, c);
};

const interpolateVector2 = (
  vectors: [Vector2, Vector2, Vector2],
  barycenter: Vector3
) => {
  const [v0, v1, v2] = vectors;

  return new Vector2(
    v0.x * barycenter.x + v1.x * barycenter.y + v2.x * barycenter.z,
    v0.y * barycenter.x + v1.y * barycenter.y + v2.y * barycenter.z
  );
};

const interpolateVector3 = (
  vectors: [Vector3, Vector3, Vector3],
  barycenter: Vector3
) => {
  const [v0, v1, v2] = vectors;

  return new Vector3(
    v0.x * barycenter.x + v1.x * barycenter.y + v2.x * barycenter.z,
    v0.y * barycenter.x + v1.y * barycenter.y + v2.y * barycenter.z,
    v0.z * barycenter.x + v1.z * barycenter.y + v2.z * barycenter.z
  );
};

export const barcentric = {
  barycenter,
  interpolateVector2,
  interpolateVector3,
};
