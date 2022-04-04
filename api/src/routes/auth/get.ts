import express from "express";
import { refreshUserInfo, removeSession } from '../../controllers/auth.controller';
var router = express.Router();

import {Request, Response} from 'express';

interface RequestExtended extends Request {
    sessionStore: Record<string, string>
}


router.get('/mail', async (req, res) => {
});

router.get('/refresh', (req: Request, res: Response): any=> {
  res.send( refreshUserInfo(req as RequestExtended) );
})
  
router.get('/logout', (req:Request, res:Response): any => {
  removeSession( req as RequestExtended );
  res.send( {status: 200, message: `User logged out`} );
})

export {router}