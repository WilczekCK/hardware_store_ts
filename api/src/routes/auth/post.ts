import express from "express";
import passport from "passport";


var router = express.Router();

router.post('/', async (req, res) => {
  //
})

router.post("/user", 
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true, successRedirect: '/login/true' }) 
);

export {router}