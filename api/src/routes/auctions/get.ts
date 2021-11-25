import express from "express";

import { getAuctions } from "../../controllers/auction.controller";

var router = express.Router();

router.get('/', async (req, res) => {
  res.send(
    await getAuctions( req.body )
  );
})

router.get('/:id', async (req, res) => {
  res.send(
    await getAuctions( { 
      where: { id: parseInt(req.params.id) }, 
      ...req.body 
    })
  );
})

export {router}