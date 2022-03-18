import express from "express";
import passport from "passport";


var router = express.Router();

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