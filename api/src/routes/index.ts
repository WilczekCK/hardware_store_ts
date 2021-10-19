import express from "express";

import { app } from "../app";
import {routes as messages} from './messages'
import {routes as auctions} from './auctions'
import {routes as accounts} from './accounts'

let router = express.Router();

app.use('/messages', messages);
app.use('/auctions', auctions);
app.use('/accounts', accounts);

export default router;