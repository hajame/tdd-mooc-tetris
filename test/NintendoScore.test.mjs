import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { NintendoScore } from "../src/NintendoScore.mjs";

describe("Nintendo Score", () => {
  let score;
  beforeEach(() => {
    score = new NintendoScore();
  });

  it("Score starts as 0", () => {
    expect(score.getScore()).to.equal(0);
  });
});
