export class Board {
  width;
  height;
  board;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = []
    for (var h = 0; h < this.height; h++) {
      this.board[h] = new Array(this.width);
      for (var w = 0; w < this.width; w++) {
        this.board[h][w] = '.'
      }
    }
  }

  toString() {
    let print = '';
    for (var h = 0; h < this.height; h++) {
      for (var w = 0; w < this.width; w++) {
        print = print.concat(this.board[h][w]);
      }
      print = print.concat('\n');
    }
    return print;
  }
}
