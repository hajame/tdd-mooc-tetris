import { expect } from "chai";
import { Block } from "../src/Block.mjs";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 7; i++) {
    board.tick();
  }
}

function turnBlock180degrees(board) {
  board.rotateRight();
  board.rotateRight();
}

function moveRight(times, board) {
  for (let i = 0; i < times + 1; i++) {
    board.moveRight();
  }
}
function moveLeft(times, board) {
  for (let i = 0; i < times + 1; i++) {
    board.moveLeft();
  }
}

describe("Line Clears", () => {
  let board;
  describe("When one line becomes full", () => {
    beforeEach(() => {
      board = new Board(9, 6);
    });
    it("it clears the row", () => {
      board.drop(Tetromino.T_SHAPE);
      moveLeft(3, board);
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      board.moveRight();
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      moveRight(4, board);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `.........
         .........
         .........
         .........
         .........
         .T..T..T.`
      );
    });

    it("it applies gravity", () => {
      board.drop(Tetromino.T_SHAPE);
      turnBlock180degrees(board);
      moveLeft(3, board);
      fallToBottom(board);
      board.drop(Tetromino.O_SHAPE);
      moveLeft(3, board);
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      turnBlock180degrees(board);
      board.moveRight();
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      turnBlock180degrees(board);
      moveRight(4, board);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `.........
         .........
         .........
         OO.......
         OO.......
         .T..T..T.`
      );
    });
  });
  describe("When two lines becomes full", () => {
    it("it clears the rows", () => {
      board = new Board(4, 6);
      board.drop(Tetromino.O_SHAPE);
      board.moveLeft();
      fallToBottom(board);
      board.drop(Tetromino.O_SHAPE);
      board.moveRight();
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `....
         ....
         ....
         ....
         ....
         ....`
      );
    });

    it("it applies gravity", () => {
      board = new Board(6, 8);
      board.drop(Tetromino.O_SHAPE);
      moveLeft(2, board);
      fallToBottom(board);
      board.drop(Tetromino.O_SHAPE);
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      moveLeft(4, board);
      fallToBottom(board);
      board.drop(Tetromino.O_SHAPE);
      moveRight(4, board);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `......
         ......
         ......
         ......
         ......
         ......
         TTT...
         .T....`
      );
    });
  });
  describe("When three lines becomes full", () => {
    it("3 rows are removed, gravity is applied", () => {
      board = new Board(5, 8);

      board.drop(Tetromino.O_SHAPE);
      board.moveLeft();
      fallToBottom(board);
      board.drop(Tetromino.O_SHAPE);
      board.moveRight();
      fallToBottom(board);
      board.drop(Tetromino.I_SHAPE);
      fallToBottom(board);
      board.drop(Tetromino.I_SHAPE);
      board.rotateRight();
      moveRight(2, board);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `.....
         .....
         .....
         .....
         .....
         .....
         .....
         ....I`
      );
    });
  });
});
