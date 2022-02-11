import express from "express";

import { getUsers } from "../../controllers/user.controller";

var router = express.Router();

router.get('/', async (req, res) => {
  res.send(
    await getUsers( req.body.length ? req.body : req.query  )
  );
})

router.get('/:id', async (req, res) => {
  res.send(
    await getUsers( { 
      where: { id: parseInt(req.params.id) }, 
      ...req.body 
    })
  );
})

export {router}