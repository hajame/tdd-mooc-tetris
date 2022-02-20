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
      this._dropTetromino(shape);
    } else {
      this._dropSingleBlockShape(shape);
    }
    this.isShapeFalling = true;
  }

  _dropTetromino(shape) {
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
  }

  _dropSingleBlockShape(shape) {
    let boardCenterLine = parseInt(this.width / 2);
    this.board[0][boardCenterLine] = shape;
    this.fallingShape = {
      shape: new RotatingShape(shape.toString()),
      bottomLeft: { y: 0, x: boardCenterLine },
    };
  }

  tick() {
    if (!this.isShapeFalling) {
      return;
    }
    let shape = this.fallingShape.shape;
    this.isShapeFalling = this._canMoveDown(shape);
    if (!this.isShapeFalling) {
      return;
    }
    this._moveShapeDown(shape);
    this.fallingShape.bottomLeft = {
      y: this.fallingShape.bottomLeft.y + 1,
      x: this.fallingShape.bottomLeft.x,
    };
  }

  _canMoveDown(shape) {
    let dimensions = this._getSolidDimensions(shape);
    const bottomY = dimensions.bottomLeft.y;
    const bottomX = dimensions.bottomLeft.x;

    if (bottomY >= this.height - 1) {
      return false;
    }
    for (var w = bottomX; w < bottomX + shape.width; w++) {
      if (!(this.board[bottomY + 1][w] instanceof Space)) {
        return false;
      }
    }
    return true;
  }

  _moveShapeDown(shape) {
    const SD = this._getSolidDimensions(shape);
    for (var h = SD.bottomLeft.y; h > SD.bottomLeft.y - SD.height; h--) {
      for (var w = SD.bottomLeft.x; w < SD.bottomLeft.x + shape.width; w++) {
        let block = this.board[h][w];
        if (block instanceof Block) {
          this._moveBlockDown(block, h, w);
          continue;
        }
      }
    }
  }

  _getSolidDimensions(shape) {
    let dimensions = {
      bottomLeft: {
        y: this.fallingShape.bottomLeft.y,
        x: this.fallingShape.bottomLeft.x,
      },
      height: shape.height,
    };
    let originalY = this.fallingShape.bottomLeft.y;
    originalY = originalY < this.height ? originalY : this.height - 1;
    const originalX = this.fallingShape.bottomLeft.x;

    for (var h = originalY; h > originalY - shape.height; h--) {
      for (var w = originalX; w < originalX + shape.width; w++) {
        if (this.board[h][w] instanceof Block) {
          return dimensions;
        }
      }
      dimensions.bottomLeft.y = dimensions.bottomLeft.y - 1;
      dimensions.height = dimensions.height - 1;
    }
    return dimensions;
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
