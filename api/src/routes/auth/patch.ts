import express from "express";
import { getUserByVerificationCode, verifyUser } from "../../controllers/auth.controller";

var router = express.Router();

router.patch('/', async (req, res) => {
  //
})

router.patch('/verify', async (req, res) => {
  const getUserIdByCode = await getUserByVerificationCode(req.body);
  if ( !getUserIdByCode ) return res.status(202).send( {message: `No verification code like this or user is verified`} );

  await verifyUser({ where: { verificationCode: req.body.where.verificationCode, id: getUserIdByCode } });
  return res.status(200).send( {message: `User verified`} );
})


export {router}