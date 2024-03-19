"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const Database_1 = require("./data-access/Database");
const app = (0, express_1.default)();
let database = new Database_1.Database();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send("Hi");
});
app.listen(5009, () => {
    console.log("Server listening in http://localhost:5009");
});
app.post("/aircrafts", async (req, res) => {
    const { model, manufacturer } = req.body;
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
    });
});
//# sourceMappingURL=main.js.map