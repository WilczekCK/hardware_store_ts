import express from "express";
import { sendForgotPasswordEmail, refreshUserInfo, removeSession } from '../../controllers/auth.controller';
import { getUsers } from "../../controllers/user.controller";
import { Request, Response } from 'express';
var router = express.Router();

type queryResults = {
    [where: string]: Record<string, string>
}

interface RequestExtended extends Request {
  sessionStore: Record<string, string>
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

router.get('/refresh', (req, res) => {
  res.send( refreshUserInfo(req, res) );
})
  
router.get('/logout', (req: RequestExtended, res) => {
  removeSession(req, res);
  res.send( {status: 200, message: `User logged out`} );
})

export {router}