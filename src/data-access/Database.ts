import mysql from 'mysql';

export class Database {
    create(model: string, manufacturer: string) {

        const connection = mysql.createConnection({
            host: "127.0.0.1",
            user: "jerry",
            password: "jerry",
            database: "ddd_bootcamp",
        });

        connection.connect();

        connection.query(
            `INSERT INTO aircrafts (model, manufacturer) VALUES (?, ?)`,
            [model, manufacturer]
        );

        connection.end();

    }
}
