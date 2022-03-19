import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

describe("Shuffle bag", () => {
  let bag;
  beforeEach(() => {
    bag = new ShuffleBag();
  });

  describe("When only 3 tetrominoes are inserted", () => {
    it("3 draws give 3 distinct objects", () => {
      bag.add(Tetromino.T_SHAPE, 1);
      bag.add(Tetromino.O_SHAPE, 1);
      bag.add(Tetromino.I_SHAPE, 1);
      let list = draw(bag, 3);
      expect(getDistinctTypes(list).length).to.equals(3);
    });
  });

  describe("When only 4 tetrominoes of 2 types are inserted", () => {
    it("4 draws give 2 distinct types", () => {
      bag.add(Tetromino.T_SHAPE, 2);
      bag.add(Tetromino.O_SHAPE, 2);
      let list = draw(bag, 4);
      expect(getDistinctTypes(list).length).to.equals(2);
    });
  });

  describe("When an item is 1/10", () => {
    it("it will show up in 10 draws", () => {
      bag.add(Tetromino.T_SHAPE, 1);
      bag.add(Tetromino.O_SHAPE, 9);
      let list = draw(bag, 10);
      expect(countType(list, "T")).to.equals(1);
    });
  });

  describe("When an item is 1/3", () => {
    it("When 500/1000 is pulled, it shows up at least 25% of the time", () => {
      bag.add(Tetromino.T_SHAPE, 334);
      bag.add(Tetromino.O_SHAPE, 666);
      let list = draw(bag, 500);
      expect(countType(list, "T")).to.greaterThanOrEqual(125);
    });

    it("When 5000/10000 is pulled, it shows up at least 30% of the time", () => {
      bag.add(Tetromino.T_SHAPE, 3334);
      bag.add(Tetromino.O_SHAPE, 6666);
      let list = draw(bag, 5000);
      expect(countType(list, "T")).to.greaterThanOrEqual(1500);
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

function countType(list, type) {
  return list.filter((x) => x.type == type).length;
}
