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
                `INSERT INTO aircrafts (model, manufacturer, version) VALUES (?, ?, 0)`,
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

    async update(model: string, manufacturer: string) {
        try {
            const [result, _]  = await this.pool!
                .query(`SELECT version from aircrafts where model = ?`, [model]);

            let version = result[0].version

            await this.pool!
                .query(`UPDATE
                        aircrafts set manufacturer = ?, version = ?
                        where model = ? and version = ?`, [manufacturer, version + 1, model, version]);
        } catch (err) {
            throw err;
        }
    }
}
