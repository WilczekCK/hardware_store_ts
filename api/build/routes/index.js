"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = require("../app");
const messages_1 = require("./messages");
const auctions_1 = require("./auctions");
const accounts_1 = require("./accounts");
let router = express_1.default.Router();
app_1.app.use(express_1.default.json());
/* Error handling before routes! */
router.get('*');
app_1.app.use('/messages', messages_1.routes);
app_1.app.use('/auctions', auctions_1.routes);
app_1.app.use('/accounts', accounts_1.routes);
router.get('/', function (req, res) {
    res.send('Main page');
});
exports.default = router;
