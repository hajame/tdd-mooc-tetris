export class TetrominoOrientation {
  orientations = new Map([
    ["I", ["....\nIIII\n....\n....", "..I.\n..I.\n..I.\n..I."]],
    ["O", ["....\n.OO.\n.OO.\n...."]],
    ["T", []],
  ]);
  type;
  current;

  constructor(type) {
    this.type = type;
  }

  right(shape) {
    const array = this.orientations.get(this.type);
    let current = array.indexOf(shape);
    let next = current == array.length - 1 ? 0 : current + 1;
    return array[next];
  }

  left(shape) {
    const array = this.orientations.get(this.type);
    let current = array.indexOf(shape);
    let prev = current == 0 ? array.length - 1 : current - 1;
    return array[prev];
  }

  initialOrientation(type) {
    return this.orientations.get(type)[0];
  }
}
