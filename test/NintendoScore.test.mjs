import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { NintendoScore } from "../src/NintendoScore.mjs";
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

describe("Nintendo Score", () => {
  let score;
  beforeEach(() => {
    score = new NintendoScore();
  });

  it("Score starts as 0", () => {
    expect(score.getScore()).to.equal(0);
  });

  describe("When rows are removed", () => {
    let board;
    it("1 row earns 40 points", () => {
      board = new Board(9, 6);
      score = new NintendoScore();
      board.attachScoreObserver(score);

      board.drop(Tetromino.T_SHAPE);
      moveLeft(3, board);
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      board.moveRight();
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      moveRight(4, board);
      fallToBottom(board);

      expect(score.getScore()).to.equal(40);
    });

    it("2 rows earn 100 points", () => {
      board = new Board(4, 6);
      score = new NintendoScore();
      board.attachScoreObserver(score);

      board.drop(Tetromino.O_SHAPE);
      board.moveLeft();
      fallToBottom(board);
      board.drop(Tetromino.O_SHAPE);
      board.moveRight();
      fallToBottom(board);

      expect(score.getScore()).to.equal(100);
    });

    it("3 rows earn 300 points", () => {
      board = new Board(5, 8);
      score = new NintendoScore();
      board.attachScoreObserver(score);

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

      expect(score.getScore()).to.equal(300);
    });
  });
});
