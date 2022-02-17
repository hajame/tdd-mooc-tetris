import { Space } from "../src/Space.mjs";
import { Block } from "../src/Block.mjs";
import { Tetromino } from "./Tetromino.mjs";

export class Board {
  width;
  height;
  board;
  isShapeFalling;
  fallingShape;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = [];
    this.fallingShape = undefined;
    this.isShapeFalling = false;
    this._initializeBoard();
  }

  _initializeBoard() {
    for (var h = 0; h < this.height; h++) {
      this.board[h] = new Array(this.width);
      for (var w = 0; w < this.width; w++) {
        this.board[h][w] = new Space();
      }
    }
  }

  hasFalling() {
    return this.isShapeFalling;
  }

  drop(shape) {
    if (this.isShapeFalling) {
      throw "already falling";
    }

    if (shape instanceof Tetromino) {
      let shapeLeftX = parseInt((this.width - shape.width) / 2);
      for (let y = 0; y < shape.height; y++) {
        for (let x = shapeLeftX; x < shapeLeftX + shape.width; x++) {
          this.board[y][x] = shape.blocks[y][x - shapeLeftX];
        }
      }
      this.fallingShape = { shape: shape, bottomY: shape.height - 1 };
    } else {
      let boardCenterLine = parseInt(this.width / 2);
      this.board[0][boardCenterLine] = shape;
      this.fallingShape = { shape: shape, bottomY: 0 };
    }
    this.isShapeFalling = true;
    this.canMoveBlock = true;
  }

  tick() {
    if (!this.isShapeFalling) {
      return;
    }
    for (var h = 0; h < this.height; h++) {
      for (var w = 0; w < this.width; w++) {
        let block = this.board[h][w];
        if (!(block instanceof Block)) {
          continue;
        }
        this.isShapeFalling = this._canMoveDown(block, h, w);
        if (this.isShapeFalling) {
          this._moveBlockDown(block, h, w);
          return;
        }
      }
    }
  }

  _canMoveDown(block, h, w) {
    return h < this.height - 1 && this.board[h + 1][w] instanceof Space;
  }

  _moveBlockDown(block, h, w) {
    if (h == this.height - 1) {
      this.blockFalling = false;
      return;
    }
    this.board[h][w] = new Space();
    this.board[h + 1][w] = block;
  }

  toString() {
    let print = "";
    for (var h = 0; h < this.height; h++) {
      for (var w = 0; w < this.width; w++) {
        print = print.concat(this.board[h][w].toString());
      }
      print = print.concat("\n");
    }
    return print;
  }
}
