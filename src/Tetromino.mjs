import { TetrominoOrientation } from "./TetrominoOrientation.mjs";
import { Block } from "./Block.mjs";
import { Space } from "./Space.mjs";

export class Tetromino {
  template;
  shape;
  height;
  width;
  blocks;
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
    this.blocks = this.toBlocks();

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

  toBlocks() {
    let blocks = Array.from(Array(this.height), () => new Array(this.width));
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let char = this.shape[y][x];
        let fillingObject = new Space();
        if (char !== ".") {
          fillingObject = new Block(char);
        }
        blocks[y][x] = fillingObject;
      }
    }
    return blocks;
  }

  toString() {
    let printout = "";
    this.shape.forEach((row) => {
      printout = printout.concat(row.join("").concat("\n"));
    });
    return printout;
  }
}
