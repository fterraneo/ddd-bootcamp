import express from 'express';
import mysql from 'mysql';

const app = express();

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hi");
})

app.listen(5009,()=> {
    console.log("Server listening in http://localhost:5009")
})

app.post("/aircrafts", async (req, res) => {
    let connection
    try {
        connection = mysql.createConnection({
            host: "127.0.0.1",
            user: "jerry",
            password: "jerry",
            database: "ddd_bootcamp",
        });
        connection.connect();
        const { model, manufacturer } = req.body;
        connection.query(
            `INSERT INTO aircrafts (model, manufacturer) VALUES (?, ?)`,
            [model, manufacturer]
        );
        res.status(202).json({
            message: 'Aircraft Created',
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    } finally {
        connection.end();
    }
});
