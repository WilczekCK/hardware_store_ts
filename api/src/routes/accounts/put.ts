import express from "express";
import { modifyUser } from "../../controllers/user.controller";

var router = express.Router();

router.put('/', async (req, res) => {
  res.send(
    await modifyUser( req.body )
  );
})

export {router}