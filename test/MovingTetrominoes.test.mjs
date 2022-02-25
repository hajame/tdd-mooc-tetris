import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

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
  describe("When a Tetromino hits a wall", () => {
    beforeEach(() => {
      board.drop(Tetromino.T_SHAPE);
    });

    it("it cannot move left beyond the board", () => {
      for (let i = 0; i < 5; i++) {
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
    it("it cannot move down beyond the board", () => {
      for (let i = 0; i < 6; i++) {
        board.moveDown();
      }
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....T.....
         ...TTT....`
      );
    });
    it("it cannot move right beyond the board", () => {
      for (let i = 0; i < 5; i++) {
        board.moveRight();
      }
      expect(board.toString()).to.equalShape(
        `........T.
         .......TTT
         ..........
         ..........
         ..........
         ..........`
      );
    });
  });

  describe("When there is another Tetromino", () => {
    it("cannot move down through another block", () => {
      board.drop(Tetromino.T_SHAPE);
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      for (let i = 0; i < 6; i++) {
        board.moveDown();
      }
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....T.....
         ...TTT....
         ....T.....
         ...TTT....`
      );
    });
    it("cannot move LEFT through another block", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveLeft();
      board.moveLeft();
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      for (let i = 0; i < 3; i++) {
        board.tick();
      }
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....T.....
         ..TTTT....
         .TTT......`
      );
    });
  });
});
