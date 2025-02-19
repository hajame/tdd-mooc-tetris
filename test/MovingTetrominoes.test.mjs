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
        `..TTT.....
         ...T......
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
        `.TTT......
         ..T.......
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
         ...TTT....
         ....T.....
         ..........
         ..........
         ..........`
      );
    });
    it("it can move right", () => {
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `....TTT...
         .....T....
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
        `.....TTT..
         ......T...
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
        `TTT.......
         .T........
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
         ...TTT....
         ....T.....`
      );
    });
    it("it cannot move right beyond the board", () => {
      for (let i = 0; i < 5; i++) {
        board.moveRight();
      }
      expect(board.toString()).to.equalShape(
        `.......TTT
         ........T.
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
         ...TTT....
         ....T.....
         ...TTT....
         ....T.....`
      );
    });
    it("cannot move LEFT through another block", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      for (let i = 0; i < 4; i++) {
        board.tick();
      }
      board.moveLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         TTTTTT....
         .T..T.....`
      );
    });
    it("can move left on top of another block", () => {
      board.drop(Tetromino.T_SHAPE);
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      fallToBottom(board);
      for (let i = 0; i < 2; i++) {
        board.tick();
      }
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..TTT.....
         ...T......
         ...TTT....
         ....T.....`
      );
    });
    it("cannot move RIGHT through another block", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveRight();
      board.moveRight();
      board.moveRight();
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      for (let i = 0; i < 4; i++) {
        board.tick();
      }
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ...TTTTTT.
         ....T..T..`
      );
    });
    it("can move right on top of another block", () => {
      board.drop(Tetromino.T_SHAPE);
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      for (let i = 0; i < 3; i++) {
        board.tick();
      }
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....TTT...
         .....T....
         ...TTT....
         ....T.....`
      );
    });
  });

  describe("When a Tetromino has been rotated", () => {
    beforeEach(() => {
      board.drop(Tetromino.T_SHAPE);
    });

    it("it can move flush to the Left wall", () => {
      board.rotateRight();
      for (let i = 0; i < 4; i++) {
        board.moveLeft();
      }
      expect(board.toString()).to.equalShape(
        `.T........
         TT........
         .T........
         ..........
         ..........
         ..........`
      );
    });

    it("it can move flush to the Right wall", () => {
      board.rotateLeft();
      for (let i = 0; i < 5; i++) {
        board.moveRight();
      }
      expect(board.toString()).to.equalShape(
        `........T.
         ........TT
         ........T.
         ..........
         ..........
         ..........`
      );
    });
  });
});
