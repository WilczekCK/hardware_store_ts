"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../../controllers/user.controller");
var router = express_1.default.Router();
exports.router = router;
router.delete('/', async (req, res) => {
    const { where } = req.body; // () => { id: [number] }
    const { affected, raw } = await (0, user_controller_1.removeUsers)({ where }); // () => results how many deleted
    if (affected > 0) {
        return res.send({ status: 200, message: `${affected} results removed, all ok` });
    }
    res.send({ status: 202, message: `No results` });
});
router.delete('/:id', async (req, res) => {
    const { affected, raw } = await (0, user_controller_1.removeUsers)({ where: [{ id: req.params.id }] }); // () => results how many deleted
    if (affected > 0) {
        return res.send({ status: 200, message: `${affected} results removed, all ok` });
    }
    res.send({ status: 202, message: `No results` });
});
