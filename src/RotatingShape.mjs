import { Block } from "./Block.mjs";
import { Space } from "./Space.mjs";

export class RotatingShape {
  shape;
  height;
  width;
  blocks;

  constructor(template) {
    const templateRows = template.replace(/ /g, "").split("\n");
    this.height = templateRows.length;
    this.width = templateRows[0].length;
    this.shape = new Array(this.height);
    for (let i = 0; i < this.height; i++) {
      this.shape[i] = templateRows[i].split("");
    }
    this.blocks = this.toBlocks();
  }

  rotateRight() {
    let template = "";
    for (let y = 0; y < this.width; y++) {
      for (let x = this.height - 1; x >= 0; x--) {
        template = template.concat(this.shape[x][y]);
      }
      template = template.concat("\n");
    }
    return new RotatingShape(template.trim());
  }

  rotateLeft() {
    let template = "";
    for (let y = this.height - 1; y >= 0; y--) {
      for (let x = 0; x < this.width; x++) {
        template = template.concat(this.shape[x][y]);
      }
      template = template.concat("\n");
    }
    return new RotatingShape(template.trim());
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
