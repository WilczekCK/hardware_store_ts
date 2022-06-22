import express from "express";

import { createAuction } from "../../controllers/auction.controller";
import { Auction } from '../../models';

var router = express.Router();

router.post('/', async (req, res) => {
  const test = await createAuction(req.body);

  if (test.status !== 200) {
    res.status(429).send( {message: 'Too many items!'} );
  } else {
    res.status(200).send( {message: 'All ok!'} );
  }
})



export {router}