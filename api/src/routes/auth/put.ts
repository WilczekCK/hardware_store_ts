import express from "express";
import { generateVerificationString, sendForgotPasswordEmail } from "../../controllers/auth.controller";

var router = express.Router();

router.put('/', async (req, res) => {
  //
})

router.put('/forgotPassword', async (req, res) => {
  const newPassword = generateVerificationString();
  const isMailSent = await sendForgotPasswordEmail(req.body, newPassword);
})


export {router} 