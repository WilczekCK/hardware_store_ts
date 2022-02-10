import express from "express";
import cors from "cors";

import { app } from "../app";
import {routes as auctions} from './auctions'
import {routes as accounts} from './accounts'
import {routes as mailbox} from './mailbox'
import {routes as messages} from './messages'
import {routes as auth} from './auth'

let router = express.Router();

const allowedOrigins = ['http://localhost:8080'];
const corsOptions : cors.CorsOptions = {
  origin: allowedOrigins
}
app.use(cors(corsOptions));
app.use(express.json());


app.use('/messages', messages);
app.use('/auctions', auctions);
app.use('/accounts', accounts);
app.use('/mailbox',  mailbox);
app.use('/auth',  auth);


router.get('/', function(req, res){
    res.send('Main page');
})

export default router;