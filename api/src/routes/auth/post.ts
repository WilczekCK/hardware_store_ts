import { resolveSoa } from "dns";
import express from "express";
import passport from "passport";


var router = express.Router();

router.post('/user/auth', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}), async (req, res) => {
  //
})

router.post("/user/login", async (req, res, next) => {
  passport.authenticate('local', (err, passportUser, info) => {
      const token = passportUser
      
      req.login(token, err => {
        res.send( token );
      })

    })(req, res, next);
});

router.post("/user/logout", async (req, res) => {
  req.logout();
  
  return res.send();
});

export {router}