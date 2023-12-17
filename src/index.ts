import { BISHOP, KING, KNIGHT, MARK, NOTHING, QUEEN, ROOK } from "./consts.js";
import { fillMoves, getMoves } from "./moves.js";

class Hippodrome {

  blinkCnt: number;
  gameOver: boolean;
  pieces: string[];
  board: string[][];
  selectedTile: HTMLDivElement;
  moveCount: number;
  moves: HTMLDivElement;

  constructor() {
    this.moves = <HTMLDivElement>document.getElementById("moves");
    const div = document.getElementById("board");
    let bw: boolean = true;

    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        const d = document.createElement("div");
        const i = x + y * 4;
        d.id = NOTHING + i;

        if (bw) d.classList.add("tileW");
        else d.classList.add("tileB");

        d.addEventListener("click", () => this.tileClick(d));
        div.appendChild(d);

        bw = !bw;
      }
      bw = !bw;
    }

    this.pieces = [ROOK, KING, ROOK, BISHOP, NOTHING, QUEEN, BISHOP, ROOK, QUEEN, BISHOP, BISHOP, ROOK];

    fillMoves();

    this.init();
  }

  init(): void {
    this.gameOver = false;
    this.selectedTile = null;
    this.moveCount = 0;
    this.moves.innerText = `Moves: ${this.moveCount}`;

    for (let z = 0; z < 9000; z++)
      this.pieces.sort((a, b) => { return (Math.random() < .5 ? -1 : 1) });
    this.board = [];

    for (let y = 0; y < 4; y++) {
      this.board[y] = [];
      for (let x = 0; x < 4; x++) {
        this.board[y][x] = this.pieces[x + y * 4];
      }
    }

    let div: HTMLDivElement;
    for (let x = 0; x < 4; x++) {
      div = <HTMLDivElement>document.getElementById(NOTHING + (12 + x));
      div.innerHTML = KNIGHT;
    }

    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 4; x++) {
        div = <HTMLDivElement>document.getElementById(NOTHING + (y * 4 + x));
        div.innerHTML = this.pieces[x + y * 4];
      }
    }
  }

  showMove(p: string, tile: HTMLDivElement): void {
    const m = getMoves(p);
    const i = parseInt(tile.id),
      x = ~~(i % 4), y = ~~(i / 4);
    let a: number, b: number, div: HTMLDivElement;

    tile.classList.add("selected");

    for (const pt of m) {
      a = x + pt.x;
      b = y + pt.y;

      if (a < 0 || a > 3 || b < 0 || b > 3) continue;

      div = <HTMLDivElement>document.getElementById(NOTHING + (a + b * 4));
      if (div.innerText === NOTHING) {
        div.innerHTML = MARK;
        div.classList.add("mark");
      }
    }
  }

  clear(): void {
    const h = document.getElementById("board").children;
    this.selectedTile.classList.remove("selected");
    this.selectedTile = null;
    for (let i = 0; i < h.length; i++) {
      if (h[i].classList.contains("mark")) {
        h[i].classList.remove("mark");
        h[i].innerHTML = null;
      }
    }
  }

  checkVictory(): void {
    const dvs = [document.getElementById("0"), document.getElementById("1"), document.getElementById("2"), document.getElementById("3")];
    for (let o = 0; o < 4; o++) {
      if (dvs[o].innerHTML !== KNIGHT) return;
    }

    this.blinkCnt = 9;
    this.gameOver = true;
    const timer = setInterval(() => {
      for (let o = 0; o < 4; o++) {
        if (dvs[o].classList.contains("green")) {
          dvs[o].classList.remove("green");
        } else {
          dvs[o].classList.add("green");
        }
      }
      if (--this.blinkCnt < 0) {
        clearInterval(timer);
        this.init();
      }
    }, 400);
  }

  jump(tile: HTMLDivElement): void {
    tile.classList.remove("mark");
    this.selectedTile.classList.remove("selected");
    tile.innerHTML = this.selectedTile.innerHTML;
    this.selectedTile.innerHTML = null;
    this.selectedTile = null;

    this.moveCount++;
    this.moves.innerText = `Moves: ${this.moveCount}`;

    this.checkVictory();
  }

  tileClick(tile: HTMLDivElement): void {
    if (this.gameOver) return;

    switch (tile.innerText) {
      case KING:
      case QUEEN:
      case ROOK:
      case BISHOP:
      case KNIGHT: {
        if (this.selectedTile !== null) {
          this.clear();
        }

        this.selectedTile = tile;
        this.showMove(tile.innerText, tile);

      } break;
      default:
        if (tile.classList.contains("mark")) {
          this.jump(tile);
        } else {
          this.clear();
        }
    }
  }
}

const h = new Hippodrome();