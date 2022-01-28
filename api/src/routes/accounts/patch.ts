import express from "express";
import { modifyUsers } from "../../controllers/user.controller";
import { isVerificationCodeValid, verifyUser } from "../../controllers/auth.controller";

var router = express.Router();

router.patch('/', async (req, res) => {
  const { where, set } = req.body;
  const { affected, raw } :any = await modifyUsers( { where, set } ) // () => results how many changed

  if ( affected > 0 ) {
    return res.send( {status: 200, message: `${affected} results modified, all ok`} );
  }

  res.send( {status: 202, message: `No results`} );
})

router.patch('/verify', async (req, res) => {
  const isCodeValid = await isVerificationCodeValid(req.body);
  if ( !isCodeValid ) return res.send( {status: 202, message: `No verification code like this!`} );

  const isVerified = await verifyUser(req.body);
  if ( !isVerified ) return res.send( {status: 202, message: `No user like that, wrong verification code or user is already verified`} );

  return res.send( {status: 200, message: `User verified`} );
})

export {router}