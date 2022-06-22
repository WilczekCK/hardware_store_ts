import express from "express";

import { createAuction } from "../../controllers/auction.controller";
import { Auction } from '../../models';

var router = express.Router();

router.post('/', async (req, res) => {
  const response = await createAuction(req.body);

  if ( response.user ) {
    res.status(200).send( {message: 'All ok!'} );
  } else {
    res.status(400).send( {message: 'Something went wrong'} );
  }
})



export {router}