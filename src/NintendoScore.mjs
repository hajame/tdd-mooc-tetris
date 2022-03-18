export class NintendoScore {
  score;

  constructor() {
    this.score = 0;
  }

  update(rowsRemoved) {
    this.score = this.score + 40;
  }

  getScore() {
    return this.score;
  }

  toString() {
    return this.score;
  }
}
