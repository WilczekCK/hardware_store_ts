import express from "express";

import { getMessages } from "../../controllers/message.controller";

var router = express.Router();

router.get('/', async (req, res) => {
  res.send(
    await getMessages( req.body.length ? req.body : req.query  )
  );
})

router.get('/:id', async (req, res) => {
  res.send(
    await getMessages( { 
      where: { id: parseInt(req.params.id) }, 
      ...req.body 
    })
  );
})

export {router}