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
    return new Tetromino(this.orientation.right(this.template), this.type);
  }

  rotateLeft() {
    return new Tetromino(this.orientation.left(this.template), this.type);
  }
}
