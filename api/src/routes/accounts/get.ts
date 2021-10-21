import express from "express";

import { getAllUsers } from "../../controllers/user.controller";

var router = express.Router();

router.get('/', async (req, res) => {
  res.send( await getAllUsers() );
})

router.get('/:id', function (req, res) {
  res.send(`Get account with ID ${req.params.id}`);
})

export {router}