import mysql from 'mysql2/promise';
import { Seat } from "./seat"

export class SeatsDatabase {
    pool: mysql.Pool | undefined

    async init() {
        this.pool = await mysql.createPool({
            host: "127.0.0.1",
            user: "jerry",
            password: "jerry",
            database: "ddd_bootcamp",
        });
    }

    async create(id: string, type: string, width: string, height: string, pitch: string, productionDate: string, comfortLevel: string, features: string) {
        try {
            const seat = new Seat(id, type, width, height, pitch, productionDate, comfortLevel, features)
            await this.pool!.query(
                `INSERT INTO seats (ID, snapshot, version) VALUES (?, ?, 0)`,
                [id, JSON.stringify(seat.toSnapshot())]
            );
        } catch (err) {
            throw err;
        }
    }

    async getAll() {
        try {
            const [ results, _] = await this.pool!.query(`SELECT snapshot FROM seats`);
            return results;
        } catch (err) {
            throw err;
        }
    }

    async delete(ID: string) {
        try {
            await this.pool!
                .query(`DELETE
                        FROM seats
                        where ID = ?`, [ID]);
        } catch (err) {
            throw err;
        }
    }

    async update(ID: string, type: string, width: string, height: string, pitch: string, productionDate: string, comfortLevel: string, features: string) {
        try {
            const seat = new Seat(ID, type, width, height, pitch, productionDate, comfortLevel, features)
            const [result, _] = await this.pool!
                .query(`SELECT version
                        from seats
                        where ID = ?`, [ID]);

            let version = result[0].version

            await this.pool!
                .query(`UPDATE
                            seats
                        set snapshot = ?,
                            version = ?
                        where ID = ?
                          and version = ?`, [JSON.stringify(seat.toSnapshot()), version + 1, ID, version]);
        } catch (err) {
            throw err;
        }
    }
}
