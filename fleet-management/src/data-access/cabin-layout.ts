export class CabinLayout {
    id: string
    width: number
    length: number

    constructor(id: string, width: number, length: number) {
        this.id = id
        this.width = width
        this.length = length
    }

    toSnapshot() {
        return {
            id: this.id,
            width: this.width,
            length: this.length
        }
    }
}
