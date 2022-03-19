export class ShuffleBag {
  bag;
  currentPosition;

  constructor() {
    this.bag = new Array();
    this.currentPosition = 0;
  }

  add(item, amount) {
    for (let i = 0; i < amount; i++) {
      this.bag.push(item);
    }
    this.currentPosition = this.size() - 1;
  }

  size() {
    return this.bag.length;
  }

  draw() {
    if (this.currentPosition < 1) {
      this.currentPosition = this.size() - 1;
      return this.bag[0];
    }
    const pos = Math.floor(Math.random() * this.currentPosition);
    let currentItem = this.bag[pos];
    this.bag[pos] = this.bag[this.currentPosition];
    this.bag[this.currentPosition] = currentItem;
    this.currentPosition--;
    return currentItem;
  }
}
