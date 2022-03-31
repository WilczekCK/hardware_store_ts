import express from "express";

import { getUsers } from "../../controllers/user.controller";

var router = express.Router();

router.get('/:id', async (req, res) => {
  const results = await getUsers( { 
    where: { id: parseInt(req.params.id) }, 
    ...req.body 
  });

  res.status( results.length ? 200 : 404 ).send( results );
})

export {router}