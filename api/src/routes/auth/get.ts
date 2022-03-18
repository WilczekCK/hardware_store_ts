import express from "express";
import { sendForgotPasswordEmail, refreshUserInfo, removeSession } from '../../controllers/auth.controller';
import { getUsers } from "../../controllers/user.controller";

var router = express.Router();

type queryResults = {
    [where: string]: Record<string, string>
}

router.get('/mail', async (req, res) => {
});

router.get('/forgotPassword', async (req, res) => {
    const [ User ] = await getUsers({ where: {email: req.body.where.email} });
    const isMailSent: Boolean = await sendForgotPasswordEmail(req.body, User.verificationCode);
  
    res.send(
      (isMailSent) 
      ? {status: 200, message: `Verification code sent to your email`}
      : {status: 402, message: `There is no user like that`}
    );
  })

router.get('/refresh', async (req, res) => {
  res.send( await refreshUserInfo(req, res) );
})
  
router.get('/logout', async (req, res) => {
  await removeSession(req, res);
  res.send( {status: 200, message: `User logged out`} );
})

export {router}