import express from 'express';
import {Database} from "./data-access/Database";

const app = express();

let database = new Database();

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hi");
})

app.listen(5009,()=> {
    console.log("Server listening in http://localhost:5009")
})

app.post("/aircrafts", async (req, res) => {
    const {model, manufacturer} = req.body;
    database.create(model, manufacturer)
        .then(() => {
            res.status(202).json({
                message: 'Aircraft Created',
            });
        })
        .catch((err) => {
            console.error("oooooh", err);
            res.status(500).json({
                message: err,
            });
        })
});
