export class CabinRow {
    id: number
    seattype: string
    extraspace: number
    seatmap: number[]

    constructor(id: number, seattype: string, extraspace: number, seatmap: number[]) {
        this.id = id
        this.seattype = seattype
        this.extraspace = extraspace
        this.seatmap = seatmap
    }

    toSnapshot() {
        return {
            id: this.id,
            seattype: this.seattype,
            extraspace: this.extraspace,
            seatmap: this.seatmap
        }
    }
}
