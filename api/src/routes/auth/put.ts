import express from "express";
import { generateVerificationString, sendForgotPasswordEmail, changeForgottenPassword } from "../../controllers/auth.controller";
import { getUsers } from "../../controllers/user.controller";

var router = express.Router();

router.put('/', async (req, res) => {
  //
})

router.put('/forgetPassword', async (req, res) => {
  const isPasswordChanged: boolean = await changeForgottenPassword(req.body);

  res
    .status(isPasswordChanged ? 200 : 403)
    .send(
      (isPasswordChanged) 
      ? {status: 200, message: `Your password is changed`}
      : {status: 403, message: `Wrong verification code`} //or user is not verified --- todo
    );
})


export {router} 