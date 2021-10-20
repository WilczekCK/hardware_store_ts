"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const app_1 = require("./app");
const PORT = process.env.PORT || 8000;
app_1.app.use(app_1.express.json());
app_1.app.use(morgan_1.default("tiny"));
app_1.app.use(app_1.express.static("public"));
app_1.app.use(routes_1.default);
app_1.app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
