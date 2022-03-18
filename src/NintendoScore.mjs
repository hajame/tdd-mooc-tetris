export class NintendoScore {
  score;

  constructor() {
    this.score = 0;
  }

  update(rowsRemoved) {
    if (rowsRemoved == 1) {
      this.score = this.score + 40;
    }
    if (rowsRemoved == 2) {
      this.score = this.score + 100;
    }
    if (rowsRemoved == 3) {
      this.score = this.score + 300;
    }
  }

  getScore() {
    return this.score;
  }

  toString() {
    return this.score;
  }
}
