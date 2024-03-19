export class Seat {
    id: string
    type: string

    constructor(id: string, type: string) {
        this.id = id
        this.type = type
    }

    toSnapshot() {
        return {
            id: this.id,
            type: this.type
        }
    }
}
