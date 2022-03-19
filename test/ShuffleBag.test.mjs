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
      bag.add(Tetromino.T_SHAPE, 1);
      bag.add(Tetromino.O_SHAPE, 1);
      bag.add(Tetromino.I_SHAPE, 1);
    });

    it("3 draws give 3 distinct objects", () => {
      let list = draw(bag, 3);
      expect(getDistinctTypes(list).length).to.equals(3);
    });
  });

  describe("When only 4 tetrominoes of 2 types are inserted", () => {
    beforeEach(() => {
      bag.add(Tetromino.T_SHAPE, 1);
      bag.add(Tetromino.O_SHAPE, 1);
      bag.add(Tetromino.T_SHAPE, 1);
      bag.add(Tetromino.O_SHAPE, 1);
    });

    it("4 draws give 2 distinct types", () => {
      let list = draw(bag, 4);
      expect(getDistinctTypes(list).length).to.equals(2);
    });
  });
});

function draw(bag, draws) {
  let list = new Array();
  for (let i = 0; i < draws; i++) {
    list.push(bag.draw());
  }
  return list;
}

function getDistinctTypes(list) {
  return list
    .map((x) => x.type)
    .filter((value, index, self) => self.indexOf(value) === index);
}
