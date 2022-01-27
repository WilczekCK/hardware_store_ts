import express from "express";
import { areCredentialsValid } from '../../controllers/auth.controller';

var router = express.Router();

router.get('/', async (req, res) => {
    const areValid = await areCredentialsValid(req.body);
    res.send( {
        status: areValid ? 200 : 401,
        areValid 
    } );
});

export {router}