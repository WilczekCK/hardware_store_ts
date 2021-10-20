import express from "express";

import { createUser } from "../../controllers/user.controller";

var router = express.Router();

router.post('/', async (req, res) => {
  res.send( await createUser(req.body) );
})

export {router}