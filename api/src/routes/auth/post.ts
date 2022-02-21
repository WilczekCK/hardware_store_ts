import express from "express";
import passport from "passport";


var router = express.Router();

router.post('/', async (req, res) => {
  //
})

router.post("/user/login", async (req, res) => {
  passport.authenticate('local', 
    (err, passportUser, info) => {
      const token = passportUser
      res.send( token );
    })(req, res);
});

router.post("/user/logout", async (req, res) => {
  req.logout();
  res.redirect('/');
});

export {router}