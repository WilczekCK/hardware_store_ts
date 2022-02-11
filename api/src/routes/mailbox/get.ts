import express from "express";

import { getMails } from "../../controllers/mailbox.controller";

var router = express.Router();

router.get('/', async (req, res) => {
  res.send(
    await getMails( req.body.length ? req.body : req.query  )
  );
})

router.get('/:id', async (req, res) => {
  res.send(
    await getMails( { 
      where: { id: parseInt(req.params.id) }, 
      ...req.body 
    })
  );
})

export {router}