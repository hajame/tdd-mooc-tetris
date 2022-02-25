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
    this.fallingShape.trimmedShape = this._trimShape();
  }

  _dropSingleBlockShape(shape) {
    this.board[0][parseInt(this.width / 2)] = shape;
    this.fallingShape = {
      shape: new RotatingShape(shape.toString()),
      bottomLeft: { y: 0, x: parseInt(this.width / 2) },
    };
    this.fallingShape.trimmedShape = this._trimShape();
  }

  moveLeft() {
    if (!this._canMoveLeft(this.fallingShape.trimmedShape)) {
      return;
    }
    this._moveShape(this.fallingShape.trimmedShape, 0, -1);
  }

  moveDown() {
    if (!this._canMoveDown(this._trimShape())) {
      return;
    }
    this._moveShape(this._trimShape(), +1, 0);
  }

  moveRight() {
    const shape = this._trimShape();
    if (shape.bottomLeft.x + shape.width - 1 >= this.width - 1) {
      return;
    }
    this._moveShapeRight(this._trimShape(), 0, +1);
  }

  tick() {
    if (!this.isShapeFalling) {
      return;
    }
    this.isShapeFalling = this._canMoveDown(this._trimShape());
    if (!this.isShapeFalling) {
      return;
    }
    this.moveDown();
  }

  _canMoveLeft(shape) {
    if (shape.bottomLeft.x <= 0) {
      return false;
    }
    if (!(this.board[shape.bottomLeft.y][shape.bottomLeft.x - 1] instanceof Space)) {
      return false;
    }
    return true;
  }

  _canMoveDown(shape) {
    const bottomY = shape.bottomLeft.y;
    const bottomX = shape.bottomLeft.x;

    if (bottomY >= this.height - 1) {
      return false;
    }
    for (var w = bottomX; w < shape.bottomLeft.x + shape.width; w++) {
      if (!(this.board[bottomY + 1][w] instanceof Space)) {
        return false;
      }
    }
    return true;
  }

  _moveShape(shape, yDiff, xDiff) {
    for (var y = shape.bottomLeft.y; y > shape.bottomLeft.y - shape.height; y--) {
      for (var x = shape.bottomLeft.x; x < shape.bottomLeft.x + shape.width; x++) {
        let block = this.board[y][x];
        if (block instanceof Block) {
          this._moveBlock(block, y, x, yDiff, xDiff);
          continue;
        }
      }
    }
    this._updateFallingShapePosition(yDiff, xDiff);
  }

  _updateFallingShapePosition(yDiff, xDiff) {
    this.fallingShape.bottomLeft = {
      y: this.fallingShape.bottomLeft.y + yDiff,
      x: this.fallingShape.bottomLeft.x + xDiff,
    };
    this.fallingShape.trimmedShape.bottomLeft = {
      y: this.fallingShape.trimmedShape.bottomLeft.y + yDiff,
      x: this.fallingShape.trimmedShape.bottomLeft.x + xDiff,
    };
  }

  _moveShapeRight(shape, yDiff, xDiff) {
    for (var y = shape.bottomLeft.y; y > shape.bottomLeft.y - shape.height; y--) {
      for (var x = shape.bottomLeft.x + shape.width; x > shape.bottomLeft.x - 1; x--) {
        let block = this.board[y][x];
        if (block instanceof Block) {
          this._moveBlock(block, y, x, yDiff, xDiff);
          continue;
        }
      }
    }
    this._updateFallingShapePosition(yDiff, xDiff);
  }

  _moveBlock(block, y, x, yDiff, xDiff) {
    this.board[y][x] = new Space();
    this.board[y + yDiff][x + xDiff] = block;
  }

  _trimShape() {
    let shape = this.fallingShape.shape;
    let result = {
      bottomLeft: {
        y: this.fallingShape.bottomLeft.y,
        x: this.fallingShape.bottomLeft.x,
      },
      height: shape.height,
      width: shape.width,
    };
    let originalY = this.fallingShape.bottomLeft.y;
    originalY = originalY < this.height ? originalY : this.height - 1;
    const originalX = this.fallingShape.bottomLeft.x;

    for (var h = originalY; h > originalY - shape.height; h--) {
      for (var w = originalX; w < originalX + shape.width; w++) {
        if (this.board[h][w] instanceof Block) {
          return result;
        }
      }
      result.bottomLeft.y = result.bottomLeft.y - 1;
      result.height = result.height - 1;
    }
    return result;
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
