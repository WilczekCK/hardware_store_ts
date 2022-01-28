"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auction_controller_1 = require("../../controllers/auction.controller");
var router = express_1.default.Router();
exports.router = router;
router.put('/', async (req, res) => {
    const { where, set } = req.body;
    const { affected, raw } = await (0, auction_controller_1.modifyAuction)({ where, set });
    if (affected > 0) {
        return res.send({ status: 200, message: `${affected} result modified, all ok` });
    }
    res.send({ status: 202, message: `No results` });
});
router.put('/:id', async (req, res) => {
    const { where, set } = req.body;
    const { affected, raw } = await (0, auction_controller_1.modifyAuction)({ where: { id: req.params.id }, set });
    if (affected > 0) {
        return res.send({ status: 200, message: `${affected} result modified, all ok` });
    }
    res.send({ status: 202, message: `No results` });
});
