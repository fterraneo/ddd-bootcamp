import mysql from 'mysql2/promise';
import { SeatType } from "./seat-type"
import {CabinLayout} from "./cabin-layout";
import {CabinRow} from "./cabin-rows";

export class CabinRowstDatabase {
    pool: mysql.Pool | undefined

    async init() {
        this.pool = await mysql.createPool({
            host: "127.0.0.1",
            user: "jerry",
            password: "jerry",
            database: "ddd_bootcamp",
        });
    }

    async create(id: number, cabinlayoutid: string, seattype: string, extraspace: number, seatmap: number[]) {
        try {
            const cabinRow = new CabinRow(id, seattype, extraspace, seatmap)
            await this.pool!.query(
                `INSERT INTO cabinrows (ID, cabinlayoutid, snapshot, version) VALUES (?, ?, ?, 0)`,
                [id, cabinlayoutid, JSON.stringify(cabinRow.toSnapshot())]
            );
        } catch (err) {
            throw err;
        }
    }

    async getByCabinLayout(cabinlayout: string) {
        try {
            const [ results, _] = await this.pool!.query(`SELECT snapshot FROM cabinrows WHERE cabinlayoutid = ?`, [cabinlayout]);
            return results;
        } catch (err) {
            throw err;
        }
    }
}
