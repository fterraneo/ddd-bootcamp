import express from 'express';
import mysql from 'mysql2';

// connecting Database
const connection = mysql.createConnection({
    host: "localhost",
    user: "jerry",
    password: "jerry",
    database: "ddd_bootcamp",
});

const app = express();

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hi");
})

app.listen(5009,()=>{
    console.log("Server listening in http://localhost:5009")
})

app.post("/aircrafts", async (req, res) => {
    try {
        connection.connect();
        const { model, manufacturer } = req.body;
        await connection.promise().query(
            `INSERT INTO aircraft (model, manufacturer) VALUES (?, ?)`,
            [model, manufacturer]
        );
        res.status(202).json({
            message: 'Aircraft Created',
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});
