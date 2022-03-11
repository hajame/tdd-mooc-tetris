import { RotatingShape } from "./RotatingShape.mjs";
import { TetrominoOrientation } from "./TetrominoOrientation.mjs";

export class Tetromino extends RotatingShape {
  type;
  orientation;
  template;
  I_SIDEWAYS = "..I..\n..I..\n..I..\n..I..\n.....";

  static T_SHAPE = new Tetromino(".T.\nTTT\n...", "T"); //4 orientations
  static I_SHAPE = new Tetromino(".....\n.....\nIIII.\n.....\n.....", "I");
  static O_SHAPE = new Tetromino(".OO\n.OO\n...", "O");

  constructor(template, type) {
    super(template);
    this.template = template;
    this.type = type;
    this.orientation = new TetrominoOrientation(type);
  }

  rotateRight() {
    if (this.type == "I") {
      return new Tetromino(this.orientation.right(this.template), this.type);
    }
    if (this.type == "O") {
      return this;
    }
    return super.rotateRight();
  }

  rotateLeft() {
    if (this.type == "I") {
      return new Tetromino(this.orientation.left(this.template), this.type);
    }
    if (this.type == "O") {
      return this;
    }
    return super.rotateLeft();
  }
}
