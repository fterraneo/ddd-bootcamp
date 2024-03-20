import express from 'express';
import {AircraftsDatabase} from "./data-access/aircrafts-database";
import {SeatTypesDatabase} from "./data-access/seat-types-database";
import {CabinLayoutDatabase} from "./data-access/cabin-layout-database";
import {CabinRowstDatabase} from "./data-access/cabin-rows-database";
import {CreateRowForCabinLayoutService} from "./application/create-row-for-cabin-layout-service";

const app = express();

let aircraftsDatabase = new AircraftsDatabase();
aircraftsDatabase.init() // FIXME this promise is not resolved
let seatTypesDatabase = new SeatTypesDatabase();
seatTypesDatabase.init() // FIXME this promise is not resolved
let layoutsDatabase = new CabinLayoutDatabase();
layoutsDatabase.init() // FIXME this promise is not resolved
let rowsDatabase = new CabinRowstDatabase();
rowsDatabase.init() // FIXME this promise is not resolved
let createRowForCabinLayoutService = new CreateRowForCabinLayoutService(seatTypesDatabase, layoutsDatabase, rowsDatabase);

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hi");
})

app.listen(5009,()=> {
    console.log("Server listening in http://localhost:5009")
})

app.get("/aircrafts", async (req, res) => {
    const results = await aircraftsDatabase.getAll()
    res.status(200).json(results)
})

app.post("/aircrafts", async (req, res) => {
    const {model, manufacturer, wingspan, cabinWidth, cabinHeight, cabinLength, cargoCapacity, range, cruiseSpeed, engineType, noiseLevel} = req.body;
    aircraftsDatabase.create(model, manufacturer, wingspan, cabinWidth, cabinHeight, cabinLength, cargoCapacity, range, cruiseSpeed, engineType, noiseLevel)
        .then(() => {
            res.status(202).json({
                message: 'Aircraft Created',
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err,
            });
        })
});

app.put("/aircrafts/:model", async (req, res) => {
    const {manufacturer, wingspan, cabinWidth, cabinHeight, cabinLength, cargoCapacity, range, cruiseSpeed, engineType, noiseLevel} = req.body;
    const model = req.params.model;

    aircraftsDatabase.update(model, manufacturer, wingspan, cabinWidth, cabinHeight, cabinLength, cargoCapacity, range, cruiseSpeed, engineType, noiseLevel)
        .then(() => {
            res.status(200).json({
                message: 'Aircraft updated',
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err,
            });
        })
});

app.delete("/aircrafts/:model", async (req, res) => {
    aircraftsDatabase.delete(req.params.model)
        .then(() => {
            res.status(204).json({});
        })
        .catch((err) => {
            res.status(500).json({
                message: err,
            });
        })
});

app.get("/seat-types", async (req, res) => {
    const results = await seatTypesDatabase.getAll()
    res.status(200).json(results)
})

app.post("/seat-types", async (req, res) => {
    const {id, type, width, height, pitch, weight, productionDate, comfortLevel, features} = req.body;
    seatTypesDatabase.create(id, type, width, height, pitch, weight, productionDate, comfortLevel, features)
        .then(() => {
            res.status(202).json({
                message: 'SeatType type Created',
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err,
            });
        })
});

app.put("/seat-types/:ID", async (req, res) => {
    const {type, width, height, pitch, weight, productionDate, comfortLevel, features} = req.body;
    const id = req.params.ID;

    seatTypesDatabase.update(id, type, width, height, pitch, weight, productionDate, comfortLevel, features)
        .then(() => {
            res.status(200).json({
                message: 'SeatType updated',
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err,
            });
        })
});

app.delete("/seat-types/:ID", async (req, res) => {
    seatTypesDatabase.delete(req.params.ID)
        .then(() => {
            res.status(204).json({});
        })
        .catch((err) => {
            res.status(500).json({
                message: err,
            });
        })
});

app.get("/cabin-layouts/:ID", async (req, res) => {
    const results = await layoutsDatabase.get(req.params.ID)
    res.status(200).json(results)
})

app.post("/cabin-layouts", async (req, res) => {
    const {id, width, length} = req.body;
    layoutsDatabase.create(id, width, length)
        .then(() => {
            res.status(202).json({
                message: 'Cabin Layout Created',
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err,
            });
        })
});

app.get("/cabin-rows/layout/:id", async (req, res) => {
    const results = await rowsDatabase.getByCabinLayout(req.params.id)
    res.status(200).json(results)
})

app.post("/cabin-rows/layout/:id", async (req, res) => {
    const {id, seattype, extraspace, seatmap} = req.body;
    const cabinlayoutid = req.params.id
    createRowForCabinLayoutService.create(id, cabinlayoutid, seattype, extraspace, seatmap)
        .then(() => {
            res.status(202).json({
                message: 'Cabin row Created',
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
            });
        })
});
