"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 8000;
const app = express_1.default();
app.get("/ping", async (_req, res) => {
    res.send({
        message: "pong",
    });
});
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
