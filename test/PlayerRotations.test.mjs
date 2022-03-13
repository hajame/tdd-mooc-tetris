import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Player rotations", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("When a Tetromino is dropped", () => {
    beforeEach(() => {
      board.drop(Tetromino.T_SHAPE);
    });

    it("it can rotate right immediately", () => {
      board.rotateRight();
      expect(board.toString()).to.equalShape(
        `....T.....
         ...TT.....
         ....T.....
         ..........
         ..........
         ..........`
      );
    });
    it("it can rotate left immediately", () => {
      board.rotateLeft();
      expect(board.toString()).to.equalShape(
        `....T.....
         ....TT....
         ....T.....
         ..........
         ..........
         ..........`
      );
    });
  });
  describe("Tetromino performs right wall kick", () => {
    beforeEach(() => {
      board.drop(Tetromino.T_SHAPE);
    });

    it("it wall kicks on rotate right", () => {
      board.rotateLeft();
      for (let i = 0; i < 6; i++) {
        board.moveRight();
      }
      board.rotateRight();
      expect(board.toString()).to.equalShape(
        `..........
         .......TTT
         ........T.
         ..........
         ..........
         ..........`
      );
    });
    it("it wall kicks on rotate left", () => {
      board.rotateLeft();
      for (let i = 0; i < 5; i++) {
        board.moveRight();
      }
      board.rotateLeft();
      expect(board.toString()).to.equalShape(
        `..........
         ........T.
         .......TTT
         ..........
         ..........
         ..........`
      );
    });
  });
  describe("Tetromino performs left wall kick", () => {
    beforeEach(() => {
      board.drop(Tetromino.T_SHAPE);
    });

    it("it wall kicks on rotate left", () => {
      board.rotateRight();
      for (let i = 0; i < 4; i++) {
        board.moveLeft();
      }
      board.rotateLeft();
      expect(board.toString()).to.equalShape(
        `..........
         TTT.......
         .T........
         ..........
         ..........
         ..........`
      );
    });
    it("it wall kicks on rotate right", () => {
      board.rotateRight();
      for (let i = 0; i < 4; i++) {
        board.moveLeft();
      }
      board.rotateRight();
      expect(board.toString()).to.equalShape(
        `..........
         .T........
         TTT.......
         ..........
         ..........
         ..........`
      );
    });
  });

  describe("When there is no room to rotate", () => {
    beforeEach(() => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateLeft();
      board.moveLeft();
      board.moveLeft();
      for (let i = 0; i < 4; i++) {
        board.tick();
      }
    });

    it("it cannot rotate right", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateLeft();
      for (let i = 0; i < 4; i++) {
        board.moveLeft();
      }
      for (let i = 0; i < 2; i++) {
        board.tick();
      }
      board.rotateRight();
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         T.........
         TTT.......
         T.TT......
         ..T.......`
      );
    });
    it("it cannot rotate left", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateLeft();
      for (let i = 0; i < 4; i++) {
        board.moveLeft();
      }
      for (let i = 0; i < 2; i++) {
        board.tick();
      }
      board.rotateLeft();
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         T.........
         TTT.......
         T.TT......
         ..T.......`
      );
    });
  });
});
