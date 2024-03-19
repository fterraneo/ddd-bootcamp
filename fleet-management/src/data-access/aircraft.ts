import e from "express"

export class Aircraft {
    model: string
    manufacturer: string
    wingspan: string
    cabinWidth: string
    cabinHeight: string
    cabinLength: string
    cargoCapacity: string
    range: string
    cruiseSpeed: string
    engineType: string
    noiseLevel: string

    constructor(model: string, manufacturer: string, wingspan: string, cabinWidth: string, cabinHeight: string, cabinLength: string, cargoCapacity: string, range: string, cruiseSpeed: string, engineType: string, noiseLevel: string) {
        this.model = model
        this.manufacturer = manufacturer
        this.wingspan = wingspan
        this.cabinWidth = cabinWidth
        this.cabinHeight = cabinHeight
        this.cabinLength = cabinLength
        this.cargoCapacity = cargoCapacity
        this.range = range
        this.cruiseSpeed = cruiseSpeed
        this.engineType = engineType
        this.noiseLevel = noiseLevel
    }

    toSnapshot() {
        return {
            model: this.model,
            manufacturer: this.manufacturer,
            wingspan: this.wingspan,
            cabinWidth: this.cabinWidth,
            cabinHeight: this.cabinHeight,
            cabinLength: this.cabinLength,
            cargoCapacity: this.cargoCapacity,
            range: this.range,
            cruiseSpeed: this.cruiseSpeed,
            engineType: this.engineType,
            noiseLevel: this.noiseLevel
        }
    }
}
