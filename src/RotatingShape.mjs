export class RotatingShape {
    rows
    height
    width
  
    constructor(string) {
      const words = string.replace(/ /g, '').split('\n')
      this.height = words.length
      this.width = words[0].length
      this.rows = new Array(this.height) 
      for (let i=0; i<this.height; i++) {
        this.rows[i] = words[i].split('')
      }
    }
  
    rotateRight() {

    }

    toString() {
      let printout = ''
      this.rows.forEach(row => {
        printout = printout.concat(row.join('').concat('\n'))
      });
      return printout
    }
  }
  