import express from "express";
import { sendForgotPasswordEmail, refreshUserInfo, removeSession } from '../../controllers/auth.controller';
import { getUsers } from "../../controllers/user.controller";
var router = express.Router();

import {Request, Response} from 'express';

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

router.get('/refresh', (req: Request, res: Response): any=> {
  res.send( refreshUserInfo(req as RequestExtended) );
})
  
router.get('/logout', (req:Request, res:Response): any => {
  removeSession( req as RequestExtended );
  res.send( {status: 200, message: `User logged out`} );
})

export {router}