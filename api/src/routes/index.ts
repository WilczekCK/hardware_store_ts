import express from "express";

import { app } from "../app";
import {routes as messages} from './messages'
import {routes as auctions} from './auctions'
import {routes as accounts} from './accounts'

let router = express.Router();

app.use(express.json());

/* Error handling before routes! */

router.get('*', )

app.use('/messages', messages);
app.use('/auctions', auctions);
app.use('/accounts', accounts);

router.get('/', function(req, res){
    res.send('Main page');
})

export default router;