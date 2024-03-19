import mysql from 'mysql2/promise';

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

    async create(model: string, manufacturer: string) {
        try {
            await this.pool!.query(
                `INSERT INTO aircrafts (model, manufacturer) VALUES (?, ?)`,
                [model, manufacturer]
            );
        } catch (err) {
            throw err;
        }
    }

    async getAll() {
        try {
            const [ results, _] = await this.pool!.query(`SELECT * FROM aircrafts`);
            return results;
        } catch (err) {
            throw err;
        }
    }
}
