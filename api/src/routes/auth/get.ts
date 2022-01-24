import express from "express";
import { areCredentialsValid } from '../../controllers/auth.controller';

var router = express.Router();

router.get('/', async (req, res) => await areCredentialsValid(req.body) );

export {router}