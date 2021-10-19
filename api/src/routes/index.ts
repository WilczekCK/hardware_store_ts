import express from "express";
import { app } from "../app";
import {routes as messages} from './messages'

let router = express.Router();

app.use('/messages', messages);

export default router;