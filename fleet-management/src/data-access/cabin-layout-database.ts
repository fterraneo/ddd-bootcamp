import mysql from 'mysql2/promise';
import { SeatType } from "./seat-type"
import {CabinLayout} from "./cabin-layout";

export class CabinLayoutDatabase {
    pool: mysql.Pool | undefined

    async init() {
        this.pool = await mysql.createPool({
            host: "127.0.0.1",
            user: "jerry",
            password: "jerry",
            database: "ddd_bootcamp",
        });
    }

    async create(id: string, width: number, length: number) {
        try {
            const cabinLayout = new CabinLayout(id, width, length)
            await this.pool!.query(
                `INSERT INTO cabinlayouts (ID, snapshot, version) VALUES (?, ?, 0)`,
                [id, JSON.stringify(cabinLayout.toSnapshot())]
            );
        } catch (err) {
            throw err;
        }
    }

    async get(ID: string) {
        try {
            const [ results, _] = await this.pool!.query(`SELECT snapshot FROM cabinlayouts WHERE ID = ?`, [ID]);
            return results[0];
        } catch (err) {
            throw err;
        }
    }
}
