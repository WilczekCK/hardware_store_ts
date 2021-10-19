import express from "express";
var router = express.Router();

router.patch('/', function (req, res) {
  res.send('Update all accounts')
})

router.patch('/:id', function (req, res) {
  res.send(`Update accounts with ID ${req.params.id}`);
})

export {router}