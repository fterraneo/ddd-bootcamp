"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const tslib_1 = require("tslib");
const promise_1 = tslib_1.__importDefault(require("mysql2/promise"));
class Database {
    async create(model, manufacturer) {
        let connection;
        try {
            connection = await promise_1.default.createConnection({
                host: "127.0.0.1",
                user: "jerry",
                password: "jerry",
                database: "ddd_bootcamp",
            });
            connection.connect();
            await connection.query(`INSERT INTO aircrafts (model, manufacturer) VALUES (?, ?)`, [model, manufacturer]);
        }
        catch (err) {
            console.error("db catch");
            throw err;
        }
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map