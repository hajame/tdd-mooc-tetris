export class RotatingShape {
    shape
    height
    width
  
    constructor(template) {
      const templateRows = template.replace(/ /g, '').split('\n')
      this.height = templateRows.length
      this.width = templateRows[0].length
      this.shape = new Array(this.height) 
      for (let i=0; i<this.height; i++) {
        this.shape[i] = templateRows[i].split('')
      }
    }
  
    rotateRight() {
      let template = ''
      for (let y=0; y<this.width; y++) {
        for (let x=this.height-1; x>=0; x--) {
          template = template.concat(this.shape[x][y]) 
        }
        template = template.concat('\n') 
      }
      return constructor(template)
    }

    rotateLeft() {
      let template = ''
      for (let y=this.height-1; y>=0; y--) {
        for (let x=0; x<this.width; x++) {
          template = template.concat(this.shape[x][y]) 
        }
        template = template.concat('\n') 
      }
      return constructor(template)
    }

    toString() {
      let printout = ''
      this.shape.forEach(row => {
        printout = printout.concat(row.join('').concat('\n'))
      });
      return printout
    }
  }
  