import express from 'express';
import {AircraftsDatabase} from "./data-access/aircrafts-database";
import {SeatsDatabase} from "./data-access/seats-database";

const app = express();

let aircraftsDatabase = new AircraftsDatabase();
aircraftsDatabase.init() // FIXME this promise is not resolved
let seatsDatabase = new SeatsDatabase();
seatsDatabase.init() // FIXME this promise is not resolved

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
    const {model, manufacturer} = req.body;
    aircraftsDatabase.create(model, manufacturer)
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

app.get("/seats", async (req, res) => {
    const results = await seatsDatabase.getAll()
    res.status(200).json(results)
})

app.post("/seats", async (req, res) => {
    const {id, type} = req.body;
    seatsDatabase.create(id, type)
        .then(() => {
            res.status(202).json({
                message: 'Seat type Created',
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err,
            });
        })
});
