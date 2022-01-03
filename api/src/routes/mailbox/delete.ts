import express from "express";
var router = express.Router();

router.delete('/', function (req, res) {
  res.send('Delete all messages from inbox')
})

router.delete('/:id', function (req, res) {
  res.send(`Delete message with ID ${req.params.id}`);
})

export {router}