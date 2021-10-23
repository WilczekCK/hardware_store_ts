import express from "express";
import { modifyUsers } from "../../controllers/user.controller";

var router = express.Router();

router.patch('/', async (req, res) => {
  res.send(
    await modifyUsers( req.body )
  );
})

export {router}