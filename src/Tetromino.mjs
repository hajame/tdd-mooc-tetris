import { TetrominoOrientation } from "./TetrominoOrientation.mjs";

export class Tetromino {
  template;
  shape;
  height;
  width;
  type;
  orientation;

  static T_SHAPE = new Tetromino("....\nTTT.\n.T..\n....", "T"); //4 orientations
  static I_SHAPE = new Tetromino("....\nIIII\n....\n....", "I");
  static O_SHAPE = new Tetromino("....\n.OO.\n.OO.\n....", "O");

  constructor(template, type) {
    const templateRows = template.replace(/ /g, "").split("\n");
    this.height = templateRows.length;
    this.width = templateRows[0].length;
    this.shape = new Array(this.height);
    for (let i = 0; i < this.height; i++) {
      this.shape[i] = templateRows[i].split("");
    }

    this.template = template;
    this.type = type;
    this.orientation = new TetrominoOrientation(type);
  }

  rotateRight() {
    return new Tetromino(this.orientation.right(this.template), this.type);
  }

  rotateLeft() {
    return new Tetromino(this.orientation.left(this.template), this.type);
  }

  toString() {
    let printout = "";
    this.shape.forEach((row) => {
      printout = printout.concat(row.join("").concat("\n"));
    });
    return printout;
  }
}
