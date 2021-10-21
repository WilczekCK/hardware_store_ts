import express from "express";

import { getAllUsers, getUsers } from "../../controllers/user.controller";

var router = express.Router();

router.get('/', async (req, res) => {
  res.send( await getAllUsers() );
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