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
      this._dropTetromino(shape, 0, parseInt((this.width - shape.width) / 2), 1);
    } else {
      this._dropSingleBlockShape(shape);
    }
    this.isShapeFalling = true;
  }

  _dropTetromino(shape, shapeTopY, shapeLeftX, trimTop) {
    for (let y = shapeTopY; y < shape.height - trimTop; y++) {
      for (let x = shapeLeftX; x < shapeLeftX + shape.width; x++) {
        this.board[y][x] = shape.blocks[y + trimTop][x - shapeLeftX];
      }
    }
    this.fallingShape = {
      shape: shape,
      bottomLeft: { y: shape.height - 1, x: shapeLeftX },
    };
    this.fallingShape.trimmedShape = this._trimShape(
      this.fallingShape.shape,
      this.fallingShape.bottomLeft.y,
      this.fallingShape.bottomLeft.x
    );
  }

  _dropSingleBlockShape(shape) {
    this.board[0][parseInt(this.width / 2)] = shape;
    this.fallingShape = {
      shape: new Tetromino(shape.toString(), shape.color),
      bottomLeft: { y: 0, x: parseInt(this.width / 2) },
    };
    this.fallingShape.trimmedShape = this._trimShape(
      this.fallingShape.shape,
      this.fallingShape.bottomLeft.y,
      this.fallingShape.bottomLeft.x
    );
  }

  rotateRight() {
    if (!this._canPerformRotation(this.fallingShape.shape.rotateRight())) {
      return;
    }
    let xDiff = this._getRotateDiff(this.fallingShape.shape.rotateRight());
    this._resetFallingShape(this.fallingShape.shape.rotateRight(), xDiff);
  }

  rotateLeft() {
    if (!this._canPerformRotation(this.fallingShape.shape.rotateRight())) {
      return;
    }
    let xDiff = this._getRotateDiff(this.fallingShape.shape.rotateLeft());
    this._resetFallingShape(this.fallingShape.shape.rotateLeft(), xDiff);
  }

  _canPerformRotation(newShape) {
    let xDiff = this._getRotateDiff(newShape);
    if (xDiff == 0) {
      return true;
    }
    let trimmedShape = this._trimShape(newShape, this.fallingShape.bottomLeft.y, this.fallingShape.bottomLeft.x);
    return xDiff < 0 ? this._canMoveLeft(trimmedShape) : this._canMoveRight(trimmedShape);
  }

  _getRotateDiff(newShape) {
    let rightWallDiff = this.width - 1 - (this.fallingShape.bottomLeft.x + newShape.width - 1);
    if (rightWallDiff < 0) {
      return rightWallDiff;
    }
    if (this.fallingShape.bottomLeft.x < 0) {
      return this.fallingShape.bottomLeft.x * -1;
    }
    return 0;
  }

  _resetFallingShape(newShape, xDiff) {
    this._removeOldShape();
    this._dropTetromino(
      newShape,
      this.fallingShape.bottomLeft.y - newShape.height + 1,
      this.fallingShape.bottomLeft.x + xDiff,
      0
    );
  }

  _removeOldShape() {
    let oldShape = this.fallingShape.trimmedShape;
    for (var y = oldShape.bottomLeft.y; y > oldShape.bottomLeft.y - oldShape.height; y--) {
      for (var x = oldShape.bottomLeft.x; x < oldShape.bottomLeft.x + oldShape.width; x++) {
        let block = this.board[y][x];
        if (block instanceof Block) {
          this.board[y][x] = new Space();
        }
      }
    }
  }

  moveLeft() {
    if (!this._canMoveLeft(this.fallingShape.trimmedShape)) {
      return;
    }
    this._moveShape(this.fallingShape.trimmedShape, 0, -1);
  }

  moveDown() {
    if (!this._canMoveDown(this.fallingShape.trimmedShape)) {
      return;
    }
    this._moveShape(this.fallingShape.trimmedShape, +1, 0);
  }

  moveRight() {
    if (!this._canMoveRight(this.fallingShape.trimmedShape)) {
      return;
    }
    this._moveShapeRight(this.fallingShape.trimmedShape, 0, +1);
  }

  tick() {
    if (!this.isShapeFalling) {
      return;
    }
    this.isShapeFalling = this._canMoveDown(this.fallingShape.trimmedShape);
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

  _canMoveRight(shape) {
    if (shape.bottomLeft.x + shape.width - 1 >= this.width - 1) {
      return;
    }
    if (!(this.board[shape.bottomLeft.y][shape.bottomLeft.x + shape.width] instanceof Space)) {
      return false;
    }
    return true;
  }

  _canMoveDown(shape) {
    if (shape.bottomLeft.y >= this.height - 1) {
      return false;
    }
    for (var w = shape.bottomLeft.x; w < shape.bottomLeft.x + shape.width; w++) {
      if (!(this.board[shape.bottomLeft.y + 1][w] instanceof Space)) {
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

  _trimShape(shape, botLeftY, botLeftX) {
    let result = {
      bottomLeft: {
        y: botLeftY,
        x: botLeftX,
      },
      height: shape.height,
      width: shape.width,
    };
    let originalY = botLeftY;
    originalY = originalY < this.height ? originalY : this.height - 1;
    const originalX = botLeftX;

    result = this._trimLeftSide(result, shape, originalY, originalX);
    result = this._trimRightSide(result, shape, originalY, originalX);
    result = this._trimBottom(result, shape, originalY, originalX);
    return result;
  }

  _trimLeftSide(dimensions, shape, originalY, originalX) {
    let result = dimensions;
    for (var w = originalX; w < originalX + shape.width / 2; w++) {
      let emptyColumn = true;
      for (var h = originalY; h > originalY - shape.height; h--) {
        if (this.board[h][w] instanceof Block) {
          emptyColumn = false;
          break;
        }
      }
      if (emptyColumn == true) {
        result.bottomLeft.x = result.bottomLeft.x + 1;
        result.width = result.width - 1;
      }
    }
    return result;
  }

  _trimRightSide(dimensions, shape, originalY, originalX) {
    let result = dimensions;
    for (var w = originalX + shape.width - 1; w > originalX + shape.width / 2; w--) {
      let emptyColumn = true;
      for (var h = originalY; h > originalY - shape.height; h--) {
        if (this.board[h][w] instanceof Block) {
          emptyColumn = false;
          break;
        }
      }
      if (emptyColumn == true) {
        result.width = result.width - 1;
      }
    }
    return result;
  }

  _trimBottom(dimensions, shape, originalY, originalX) {
    let result = dimensions;
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
