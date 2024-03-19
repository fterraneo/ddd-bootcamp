export class Seat {
    id: string
    type: string
    width: string
    height: string
    pitch: string
    productionDate: string
    comfortLevel: string
    features: string

    constructor(id: string, type: string, width: string, height: string, pitch: string, productionDate: string, comfortLevel: string, features: string) {
        this.id = id
        this.type = type
        this.width = width
        this.height = height
        this.pitch = pitch
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
            productionDate: this.productionDate,
            comfortLevel: this.comfortLevel,
            features: this.features
        }
    }
}
