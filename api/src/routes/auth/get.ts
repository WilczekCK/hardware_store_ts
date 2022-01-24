import express from "express";
import { areCredentialsValid } from '../../controllers/auth.controller';

var router = express.Router();

router.get('/', async (req, res) => {
  console.log( areCredentialsValid('wilkuwdr2008@gmail.com', 'asdsdsd') );
})

export {router}