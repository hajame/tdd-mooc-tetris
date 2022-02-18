import { Space } from "../src/Space.mjs";
import { Block } from "../src/Block.mjs";
import { Tetromino } from "./Tetromino.mjs";
import { RotatingShape } from "./RotatingShape.mjs";

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
      this.fallingShape = {
        shape: shape,
        bottomLeft: { y: shape.height - 1, x: shapeLeftX },
      };
    } else {
      let boardCenterLine = parseInt(this.width / 2);
      this.board[0][boardCenterLine] = shape;
      this.fallingShape = {
        shape: new RotatingShape(shape.toString()),
        bottomLeft: { y: 0, x: boardCenterLine },
      };
    }
    this.isShapeFalling = true;
    this.canMoveBlock = true;
  }

  tick() {
    if (!this.isShapeFalling) {
      return;
    }
    let shape = this.fallingShape.shape;
    this.isShapeFalling = this._canMoveDown();

    if (!this.isShapeFalling) {
      return;
    }

    const bottomLeft = this.fallingShape.bottomLeft;
    const bottomY = bottomLeft.y;
    const bottomX = bottomLeft.x;

    console.log(bottomLeft, "AAAA", shape.height, shape.width);

    for (var h = bottomY; h > bottomY - shape.height; h--) {
      for (var w = bottomX; w < bottomX + shape.width; w++) {
        let block = this.board[h][w];
        if (block instanceof Block) {
          console.log(block, "BBBB");
          this._moveBlockDown(block, h, w);
          continue;
        }
      }
    }
    this.fallingShape.bottomLeft = {
      y: bottomLeft.y + 1,
      x: bottomLeft.x,
    };
    console.log(this.fallingShape.bottomLeft, "AAAA");
  }

  _canMoveDown() {
    let shape = this.fallingShape.shape;
    const bottomLeft = this.fallingShape.bottomLeft;
    const bottomY = bottomLeft.y;
    const bottomX = bottomLeft.x;

    if (bottomY >= this.height - 1) {
      return false;
    }
    for (var w = bottomX; w < bottomX + shape.width; w++) {
      console.log(this.board[bottomY + 1][w], "CCCCCC");
      if (!(this.board[bottomY + 1][w] instanceof Space)) {
        return false;
      }
    }
    return true;
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
