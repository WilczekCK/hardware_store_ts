"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.router = router;
router.get('/', function (req, res) {
    res.send('Get all auctions');
});
router.get('/:id', function (req, res) {
    res.send(`Get auction with ID ${req.params.id}`);
});
