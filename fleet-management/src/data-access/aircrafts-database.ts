import mysql from 'mysql2/promise';
import { Aircraft } from "./aircraft"

export class AircraftsDatabase {
    pool: mysql.Pool | undefined

    async init() {
        this.pool = await mysql.createPool({
            host: "127.0.0.1",
            user: "jerry",
            password: "jerry",
            database: "ddd_bootcamp",
        });
    }

    async create(model: string, manufacturer: string, wingspan: string, cabinWidth: string, cabinHeight: string, cabinLength: string, cargoCapacity: string, range: string, cruiseSpeed: string, engineType: string, noiseLevel: string) {
        try {
            const aircraft = new Aircraft(model, manufacturer, wingspan, cabinWidth, cabinHeight, cabinLength, cargoCapacity, range, cruiseSpeed, engineType, noiseLevel)
            await this.pool!.query(
                `INSERT INTO aircrafts (model, snapshot, version) VALUES (?, ?, 0)`,
                [aircraft.model, JSON.stringify(aircraft.toSnapshot())]
            );
        } catch (err) {
            throw err;
        }
    }

    async getAll() {
        try {
            const [ results, _] = await this.pool!.query(`SELECT snapshot FROM aircrafts`);
            return results;
        } catch (err) {
            throw err;
        }
    }

    async delete(model: string) {
        try {
            await this.pool!
                .query(`DELETE
                        FROM aircrafts
                        where model = ?`, [model]);
        } catch (err) {
            throw err;
        }
    }

    async update(model: string, manufacturer: string, wingspan: string, cabinWidth: string, cabinHeight: string, cabinLength: string, cargoCapacity: string, range: string, cruiseSpeed: string, engineType: string, noiseLevel: string) {
        try {
            const aircraft = new Aircraft(model, manufacturer, wingspan, cabinWidth, cabinHeight, cabinLength, cargoCapacity, range, cruiseSpeed, engineType, noiseLevel)
            const [result, _]  = await this.pool!
                .query(`SELECT version from aircrafts where model = ?`, [aircraft.model]);

            let version = result[0].version

            await this.pool!
                .query(`UPDATE
                        aircrafts set snapshot = ?, version = ?
                        where model = ? and version = ?`, [JSON.stringify(aircraft.toSnapshot()), version + 1, aircraft.model, version]);
        } catch (err) {
            throw err;
        }
    }
}
