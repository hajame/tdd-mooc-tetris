import { RotatingShape } from "./RotatingShape.mjs";
import { TetrominoOrientation } from "./TetrominoOrientation.mjs";

export class Tetromino extends RotatingShape {
  type;
  orientation;
  template;
  I_SIDEWAYS = "..I..\n..I..\n..I..\n..I..\n.....";

  static T_SHAPE = new Tetromino("....\nTTT.\n.T..\n....", "T"); //4 orientations
  static I_SHAPE = new Tetromino("....\nIIII\n....\n....", "I");
  static O_SHAPE = new Tetromino("....\n.OO.\n.OO.\n....", "O");

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
      return new Tetromino(this.orientation.right(this.template), this.type);
    }
    return super.rotateRight();
  }

  rotateLeft() {
    if (this.type == "I") {
      return new Tetromino(this.orientation.left(this.template), this.type);
    }
    if (this.type == "O") {
      return new Tetromino(this.orientation.right(this.template), this.type);
    }
    return super.rotateLeft();
  }
}
