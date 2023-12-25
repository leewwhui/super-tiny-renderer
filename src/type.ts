import { Vector2 } from "./math/vector2";
import { Vector3 } from "./math/vector3";

export type ThreeVector3 = [Vector3, Vector3, Vector3]

export type ThreeVector2 = [Vector2, Vector2, Vector2]

export type BouondingBox = {
  x: number;
  y: number;
  w: number;
  z: number;
};
