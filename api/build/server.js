"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = require("./app");
const database_1 = __importDefault(require("./config/database"));
const PORT = process.env.PORT || 8000;
app_1.app.use((0, morgan_1.default)("tiny"));
app_1.app.use(app_1.express.static("public"));
app_1.app.use(routes_1.default);
//DB CONNECTION
(0, typeorm_1.createConnection)(database_1.default)
    .then((_connection) => {
    app_1.app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
})
    .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
});
