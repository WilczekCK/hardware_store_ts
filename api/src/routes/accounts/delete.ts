import express from "express";

import { removeUsers } from "../../controllers/user.controller";

var router = express.Router();

router.delete('/', async (req, res) => {  
  const { where } = req.body;

  res.send(
    await removeUsers( { 
      where
    })
  );
})

export {router}