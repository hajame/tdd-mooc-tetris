import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

describe("Shuffle bag", () => {
  let bag;
  beforeEach(() => {
    bag = new ShuffleBag();
  });

  describe("When only 3 tetrominoes are inserted", () => {
    beforeEach(() => {
      bag.drop(Tetromino.T_SHAPE, 1);
      bag.drop(Tetromino.O_SHAPE, 1);
      bag.drop(Tetromino.I_SHAPE, 1);
    });

    it("3 draws give 3 distinct objects", () => {
      let list = new Array();
      list.push(bag.draw());
      list.push(bag.draw());
      list.push(bag.draw());
      expect(getDistinctTypes(list).length).to.equals(3);
    });
  });
});

function getDistinctTypes(list) {
  return list
    .map((x) => x.type)
    .filter((value, index, self) => self.indexOf(value) === index);
}
