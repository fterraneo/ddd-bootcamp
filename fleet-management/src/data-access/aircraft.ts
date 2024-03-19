export class Aircraft {
    model: string
    manufacturer: string

    constructor(model: string, manufacturer: string) {
        this.model = model
        this.manufacturer = manufacturer
    }

    toSnapshot() {
        return {
            model: this.model,
            manufacturer: this.manufacturer
        }
    }
}
