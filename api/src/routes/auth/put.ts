import express from "express";
import { generateVerificationString, sendForgotPasswordEmail } from "../../controllers/auth.controller";

var router = express.Router();

router.put('/', async (req, res) => {
  //
})

router.put('/forgotPassword', async (req, res) => {
  const newPassword = generateVerificationString();
  const setNewHashedPassword = await sendForgotPasswordEmail(req.body, newPassword);
  const isMailSent = await sendForgotPasswordEmail(req.body, newPassword);

  res.send({newPassword: setNewHashedPassword, isMailSent})
})


export {router} 