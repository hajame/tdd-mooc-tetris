import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("When a Tetromino is dropped", () => {
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
  });
});
