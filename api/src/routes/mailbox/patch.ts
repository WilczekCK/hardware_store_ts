import express from "express";
var router = express.Router();

router.patch('/', function (req, res) {
  res.send('Update all messages from inbox')
})

router.patch('/:id', function (req, res) {
  res.send(`Update messages with ID ${req.params.id}`);
})

export {router}