import express from "express";
import { areCredentialsValid, sendVerificationEmail } from '../../controllers/auth.controller';

var router = express.Router();

router.get('/user', async (req, res) => {
    const areValid = await areCredentialsValid(req.body);
    res.send( {
        status: areValid ? 200 : 401,
        areValid 
    } );
});

router.get('/mail', async (req, res) => {
});

export {router}