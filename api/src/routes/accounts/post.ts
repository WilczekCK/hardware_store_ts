import express from "express";
var router = express.Router();

router.post('/', function (req, res) {
  res.send('Create an account')
})

export {router}