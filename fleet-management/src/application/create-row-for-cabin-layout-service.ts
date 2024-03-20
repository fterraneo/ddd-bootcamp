import {CabinRow} from "../data-access/cabin-rows";
import {SeatTypesDatabase} from "../data-access/seat-types-database";
import {CabinLayoutDatabase} from "../data-access/cabin-layout-database";
import {CabinRowstDatabase} from "../data-access/cabin-rows-database";

export class CreateRowForCabinLayoutService {
    seatTypeDatabase: SeatTypesDatabase
    layoutDatabase: CabinLayoutDatabase
    rowsDatabase: CabinRowstDatabase

    constructor(seatTypeDatabase, layoutDatabase, rowsDatabase) {
        this.seatTypeDatabase = seatTypeDatabase
        this.layoutDatabase = layoutDatabase
        this.rowsDatabase = rowsDatabase
    }

    async create(id: number, cabinlayoutid: string, seattype: string, extraspace: number, seatmap: number[]) {
        const cabinRow = new CabinRow(id, seattype, extraspace, seatmap)
        const seatWidth = (await this.seatTypeDatabase.get(seattype)).snapshot.width
        const layoutWidth = (await this.layoutDatabase.get(cabinlayoutid)).snapshot.width

        console.log("seatWidth", seatWidth, "layoutWidth", layoutWidth);
        console.log("cabinRow.isFittingWidth", cabinRow.isFittingWidth(seatWidth, layoutWidth));

        if (cabinRow.isFittingWidth(seatWidth, layoutWidth)) {
            await this.rowsDatabase.create(id, cabinlayoutid, seattype, extraspace, seatmap)
        } else {
            throw new Error("Row not fitting")
        }
    }
}
