import express from "express";
import { generateVerificationString, sendForgotPasswordEmail, changeForgottenPasswordToTemp } from "../../controllers/auth.controller";
import { getUsers } from "../../controllers/user.controller";

var router = express.Router();

router.put('/', async (req, res) => {
  //
})

router.put('/forgotPassword', async (req, res) => {
  
  const [User] = await getUsers({ where: {email: req.body.where.email} });
  const isMailSent = await sendForgotPasswordEmail(req.body, User.verificationCode);

  res.send(
    (isMailSent) 
    ? {status: 200, message: `Verification code sent to your email`}
    : {status: 202, message: `There is no user like that`}
  );
})


export {router} 