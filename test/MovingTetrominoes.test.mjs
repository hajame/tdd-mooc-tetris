import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("When a Tetromino is moved", () => {
    beforeEach(() => {
      board.drop(Tetromino.T_SHAPE);
    });

    it("it can move left", () => {
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `...T......
         ..TTT.....
         ..........
         ..........
         ..........
         ..........`
      );
    });
    it("it can move left twice", () => {
      board.moveLeft();
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `..T.......
         .TTT......
         ..........
         ..........
         ..........
         ..........`
      );
    });
    it("it can move down", () => {
      board.moveDown();
      expect(board.toString()).to.equalShape(
        `..........
         ....T.....
         ...TTT....
         ..........
         ..........
         ..........`
      );
    });
    it("it can move right", () => {
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `.....T....
         ....TTT...
         ..........
         ..........
         ..........
         ..........`
      );
    });
    it("it can move right twice", () => {
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `......T...
         .....TTT..
         ..........
         ..........
         ..........
         ..........`
      );
    });
  });
  xdescribe("When a Tetromino hits a wall", () => {
    beforeEach(() => {
      board.drop(Tetromino.T_SHAPE);
    });

    it("it cannot move left beyond the board", () => {
      for (let i = 0; i < 3; i++) {
        board.moveLeft();
      }
      expect(board.toString()).to.equalShape(
        `.T........
         TTT.......
         ..........
         ..........
         ..........
         ..........`
      );
    });
  });
});
