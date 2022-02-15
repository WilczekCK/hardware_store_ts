import express from "express";
import { areCredentialsValid, sendVerificationEmail, sendForgotPasswordEmail } from '../../controllers/auth.controller';

var router = express.Router();

router.post('/', async (req, res) => {
  //
})

router.post('/user', async (req, res) => {
  const areValid: boolean = await areCredentialsValid(req.body.where ? req.body : req.query );
  res.send( {
      status: areValid ? 200 : 401,
      areValid 
  } );
});

export {router}