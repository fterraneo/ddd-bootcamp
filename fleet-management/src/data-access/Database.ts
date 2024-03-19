import mysql from 'mysql2/promise';

export class Database {

    async create(model: string, manufacturer: string) {
        let connection;

        try {
            connection = await mysql.createConnection({
                host: "127.0.0.1",
                user: "jerry",
                password: "jerry",
                database: "ddd_bootcamp",
            });

            connection.connect();

            await connection.query(
                `INSERT INTO aircrafts (model, manufacturer) VALUES (?, ?)`,
                [model, manufacturer]
            );

        } catch (err) {
            throw err;
        }
    }

    async getAll() {
        let connection;

        try {
            connection = await mysql.createConnection({
                host: "127.0.0.1",
                user: "jerry",
                password: "jerry",
                database: "ddd_bootcamp",
            });

            connection.connect();

            const [ results, _] = await connection.query(`SELECT * FROM aircrafts`);
            return results;
        } catch (err) {
            throw err;
        }
    }
}
