import express from "express";
import { getUserByVerificationCode, verifyUser } from "../../controllers/auth.controller";

var router = express.Router();

router.patch('/', async (req, res) => {
  //
})

router.patch('/verify', async (req, res) => {
  const getUserIdByCode = await getUserByVerificationCode(req.body);
  if ( !getUserIdByCode ) return res.send( {status: 202, message: `No verification code like this or user is verified`} );

  const isVerified = await verifyUser({ 
      where: {
        verificationCode: req.body.where.verificationCode,
        id: getUserIdByCode
      }
    });
  if ( !isVerified ) return res.send( {status: 202, message: `No user like that, wrong verification code`} );

  return res.send( {status: 200, message: `User verified`} );
})


export {router}