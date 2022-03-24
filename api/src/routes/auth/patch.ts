import express from "express";
import { isVerificationCodeValid, verifyUser } from "../../controllers/auth.controller";

var router = express.Router();

router.patch('/', async (req, res) => {
  //
})

router.patch('/verify', async (req, res) => {
  const isUserWithCode = await isVerificationCodeValid(req.body);
  if ( !isUserWithCode ) return res.send( {status: 202, message: `No verification code like this!`} );

  console.log(isUserWithCode);

  //const isVerified = await verifyUser(req.body);
  //if ( !isVerified ) return res.send( {status: 202, message: `No user like that, wrong verification code or user is already verified`} );

  return res.send( {status: 200, message: `User verified`} );
})


export {router}