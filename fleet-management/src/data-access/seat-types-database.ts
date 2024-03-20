import mysql from 'mysql2/promise';
import { SeatType } from "./seat-type"

export class SeatTypesDatabase {
    pool: mysql.Pool | undefined

    async init() {
        this.pool = await mysql.createPool({
            host: "127.0.0.1",
            user: "jerry",
            password: "jerry",
            database: "ddd_bootcamp",
        });
    }

    async create(id: string, type: string, width: number, height: number, pitch: number, weight: number, productionDate: number, comfortLevel: number, features: string) {
        try {
            const seat = new SeatType(id, type, width, height, pitch, weight, productionDate, comfortLevel, features)
            await this.pool!.query(
                `INSERT INTO seattypes (ID, snapshot, version) VALUES (?, ?, 0)`,
                [id, JSON.stringify(seat.toSnapshot())]
            );
        } catch (err) {
            throw err;
        }
    }

    async getAll() {
        try {
            const [ results, _] = await this.pool!.query(`SELECT snapshot FROM seattypes`);
            return results;
        } catch (err) {
            throw err;
        }
    }

    async delete(ID: string) {
        try {
            await this.pool!
                .query(`DELETE
                        FROM seattypes
                        where ID = ?`, [ID]);
        } catch (err) {
            throw err;
        }
    }

    async update(ID: string, type: string, width: number, height: number, pitch: number, weight: number, productionDate: number, comfortLevel: number, features: string) {
        try {
            const seat = new SeatType(ID, type, width, height, pitch, weight, productionDate, comfortLevel, features)
            const [result, _] = await this.pool!
                .query(`SELECT version
                        from seattypes
                        where ID = ?`, [ID]);

            let version = result[0].version

            await this.pool!
                .query(`UPDATE
                            seattypes
                        set snapshot = ?,
                            version = ?
                        where ID = ?
                          and version = ?`, [JSON.stringify(seat.toSnapshot()), version + 1, ID, version]);
        } catch (err) {
            throw err;
        }
    }
}
