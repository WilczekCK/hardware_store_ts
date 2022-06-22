import express from "express";

import { createAuction } from "../../controllers/auction.controller";
import { Auction } from '../../models';

var router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.body);
  return;

  const response = await createAuction(req.body);

  if ( response.user ) {
    res.status(200).send( {message: 'All ok!'} );
  } else {
    res.status(400).send( {message: response.message ? response.message : 'Something went wrong'} );
  }
})



export {router}