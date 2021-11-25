import express from "express";

import { createAuction } from "../../controllers/auction.controller";

var router = express.Router();

router.post('/', async (req, res) => {
  res.send( await createAuction(req.body) );
})

export {router}