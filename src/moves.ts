import { BISHOP, KING, KNIGHT, QUEEN, ROOK } from "./consts.js";

class Point {
  x: number;
  y: number;

  constructor(_x: number, _y: number) {
    this.x = _x;
    this.y = _y;
  }
}

const eight: Point[] = [];
const four: Point[] = [];
const fourD: Point[] = [];
const knight: Point[] = [];

function fillMoves() {
  eight.push(new Point(-1, -1)); eight.push(new Point(0, -1));
  eight.push(new Point(1, -1)); eight.push(new Point(-1, 0));
  eight.push(new Point(1, 0)); eight.push(new Point(-1, 1));
  eight.push(new Point(0, 1)); eight.push(new Point(1, 1));

  four.push(new Point(0, -1)); four.push(new Point(-1, 0));
  four.push(new Point(0, 1)); four.push(new Point(1, 0));

  fourD.push(new Point(1, -1)); fourD.push(new Point(-1, -1));
  fourD.push(new Point(1, 1)); fourD.push(new Point(-1, 1));

  knight.push(new Point(-2, 1)); knight.push(new Point(2, 1));
  knight.push(new Point(-2, -1)); knight.push(new Point(2, -1));
  knight.push(new Point(-1, 2)); knight.push(new Point(1, 2));
  knight.push(new Point(-1, -2)); knight.push(new Point(1, -2));
}

function getMoves(p: string): Point[] {

  switch (p) {
    case QUEEN:
    case KING:
      return eight;
    case ROOK:
      return four;
    case BISHOP:
      return fourD;
    case KNIGHT:
      return knight;
  }
}

export { Point, fillMoves, getMoves };
