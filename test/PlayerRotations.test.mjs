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
         ....TT....
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
         ...TT.....
         ....T.....
         ..........
         ..........
         ..........`
      );
    });
  });
  xdescribe("When a Tetromino hits a wall", () => {});

  xdescribe("When there is another Tetromino", () => {});
});
