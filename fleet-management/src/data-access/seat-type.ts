export class SeatType {
    id: string
    type: string
    width: number
    height: number
    pitch: number
    weight: number
    productionDate: number
    comfortLevel: number
    features: string

    constructor(id: string, type: string, width: number, height: number, pitch: number, weight: number, productionDate: number, comfortLevel: number, features: string) {
        this.id = id
        this.type = type
        this.width = width
        this.height = height
        this.pitch = pitch
        this.weight = weight
        this.productionDate = productionDate
        this.comfortLevel = comfortLevel
        this.features = features
    }

    toSnapshot() {
        return {
            id: this.id,
            type: this.type,
            width: this.width,
            height: this.height,
            pitch: this.pitch,
            weight: this.weight,
            productionDate: this.productionDate,
            comfortLevel: this.comfortLevel,
            features: this.features
        }
    }
}
