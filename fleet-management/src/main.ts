import express from 'express';
import {AircraftsDatabase} from "./data-access/aircrafts-database";
import {SeatTypesDatabase} from "./data-access/seat-types-database";

const app = express();

let aircraftsDatabase = new AircraftsDatabase();
aircraftsDatabase.init() // FIXME this promise is not resolved
let seatTypesDatabase = new SeatTypesDatabase();
seatTypesDatabase.init() // FIXME this promise is not resolved

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
