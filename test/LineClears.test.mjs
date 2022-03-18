import { expect } from "chai";
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

describe("Line Clears", () => {
  let board;
  beforeEach(() => {
    board = new Board(9, 6);
  });
  describe("When one line becomes full", () => {
    it("it clears the row", () => {
      board.drop(Tetromino.T_SHAPE);
      moveLeft(3, board);
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      board.moveRight();
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveRight();
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
         .........
         .........
         .T..T..T.`
      );
    });
  });
});

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
