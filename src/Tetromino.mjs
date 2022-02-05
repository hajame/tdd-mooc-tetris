import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino extends RotatingShape {
    type
    orientations
    I_SIDEWAYS = '..I..\n..I..\n..I..\n..I..\n.....'

    static T_SHAPE = new Tetromino('.T.\nTTT\n...', 'T', 4)
    static I_SHAPE = new Tetromino('.....\n.....\nIIII.\n.....\n.....', 'I', 2)
    static O_SHAPE = new Tetromino('.OO\n.OO\n...', 'O', 1)
    
    constructor(template, type, orientations) {
        super(template)
        this.type = type
        this.orientations = orientations
    }

    rotateRight() {
        if (this.orientations == 2) {
            return this.oppositeState()
        }
        if (this.orientations == 1) {
            return this
        }
        return super.rotateRight()
    }

    rotateLeft() {
        if (this.orientations == 2) {
            return this.oppositeState()
        }
        if (this.orientations == 1) {
            return this
        }
        return super.rotateLeft()
    }

    oppositeState() {
        if (this.type == 'I') {
            if (this.toString() == this.I_SIDEWAYS) {
                return this.I_SHAPE
            } else {
                return new Tetromino(this.I_SIDEWAYS, 'I', 2)
            }
        }
    }
}