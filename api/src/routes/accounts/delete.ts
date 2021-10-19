import express from "express";
var router = express.Router();

router.delete('/', function (req, res) {
  res.send('Delete all accounts!')
})

router.delete('/:id', function (req, res) {
  res.send(`Delete account with ID ${req.params.id}`);
})

export {router}