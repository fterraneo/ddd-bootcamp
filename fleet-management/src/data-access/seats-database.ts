import mysql from 'mysql2/promise';

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

    async create(id: string, type: string) {
        try {
            await this.pool!.query(
                `INSERT INTO seats (ID, type) VALUES (?, ?)`,
                [id, type]
            );
        } catch (err) {
            throw err;
        }
    }

    async getAll() {
        try {
            const [ results, _] = await this.pool!.query(`SELECT * FROM seats`);
            return results;
        } catch (err) {
            throw err;
        }
    }
}
