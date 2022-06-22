import express from "express";
import { removeAuctions } from "../../controllers/auction.controller";


var router = express.Router();

router.delete('/', async (req, res) => {  
  await removeAuctions(req.body);
})



export {router}