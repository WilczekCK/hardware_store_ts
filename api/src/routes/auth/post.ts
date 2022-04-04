import express from "express";
import passport from "passport";
import { sendForgotPasswordEmail } from '../../controllers/auth.controller';
import { getUsers } from "../../controllers/user.controller";

var router = express.Router();


router.post('/forgotPassword', async (req, res) => {
  const [ User ] = await getUsers({ where: {email: req.body.where.email} });
  const isMailSent: Boolean = await sendForgotPasswordEmail(req.body, User.verificationCode);

  res.send(
    (isMailSent) 
    ? {status: 200, message: `Verification code sent to your email`}
    : {status: 402, message: `There is no user like that`}
  );
})

router.post("/user/login", (req, res, next) => {
  passport.authenticate('local', (err, passportUser, info) => {
    if (err) { return false }
    if (!passportUser) { return false }
    if ( passportUser ) {
      console.log('Passed!');

      req.login(passportUser, (err) => {
        if ( err ) {
          return next(err);
        }

        return res.status(200).send( {...passportUser, sessionID: req.sessionID} );
      });
    }
  })(req, res, next);
})

router.post("/user/logout", async (req, res) => {
  req.logout();
  
  return res.send();
});

export {router}