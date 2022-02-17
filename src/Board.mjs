import { Space } from "../src/Space.mjs";
import { Block } from "../src/Block.mjs";

export class Board {
  width;
  height;
  board;
  isBlockFalling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = [];
    this.isBlockFalling = false;
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
    return this.isBlockFalling;
  }

  drop(block) {
    if (this.isBlockFalling) {
      throw "already falling";
    }
    let boardCenterLine = parseInt(this.width / 2);
    this.board[0][boardCenterLine] = block;
    this.isBlockFalling = true;
    this.canMoveBlock = true;
  }

  tick() {
    if (!this.isBlockFalling) {
      return;
    }
    for (var h = 0; h < this.height; h++) {
      for (var w = 0; w < this.width; w++) {
        let block = this.board[h][w];
        if (!(block instanceof Block)) {
          continue;
        }
        this.isBlockFalling = this._canMoveDown(block, h, w);
        if (this.isBlockFalling) {
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
