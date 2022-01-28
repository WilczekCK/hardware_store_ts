"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../../controllers/message.controller");
var router = express_1.default.Router();
exports.router = router;
router.get('/', async (req, res) => {
    res.send(await (0, message_controller_1.getMessages)(req.body));
});
router.get('/:id', async (req, res) => {
    res.send(await (0, message_controller_1.getMessages)({
        where: { id: parseInt(req.params.id) },
        ...req.body
    }));
});
