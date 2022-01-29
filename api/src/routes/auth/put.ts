import express from "express";
import { generateVerificationString, sendForgotPasswordEmail, changeForgottenPasswordToTemp } from "../../controllers/auth.controller";

var router = express.Router();

router.put('/', async (req, res) => {
  //
})

router.put('/forgotPassword', async (req, res) => {
  const newPassword = generateVerificationString();
  const setNewHashedPassword = await changeForgottenPasswordToTemp(req.body, newPassword);
  const isMailSent = await sendForgotPasswordEmail(req.body, newPassword);

  res.send({newPassword: setNewHashedPassword, isMailSent})
})


export {router} 