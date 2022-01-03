import express from "express";

import { createMessage } from "../../controllers/message.controller";

var router = express.Router();

router.post('/', async (req, res) => {
  res.send( await createMessage(req.body) );
})

export {router}