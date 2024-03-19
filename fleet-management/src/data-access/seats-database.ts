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
                `INSERT INTO seats (ID, type, version) VALUES (?, ?, 0)`,
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

    async update(ID: string, type: string) {
        try {
            const [result, _] = await this.pool!
                .query(`SELECT version
                        from seats
                        where ID = ?`, [ID]);

            let version = result[0].version

            await this.pool!
                .query(`UPDATE
                            seats
                        set type = ?,
                            version = ?
                        where ID = ?
                          and version = ?`, [type, version + 1, ID, version]);
        } catch (err) {
            throw err;
        }
    }
}
