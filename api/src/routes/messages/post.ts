import express from "express";
var router = express.Router();

router.post('/', function (req, res) {
  res.send('Post messages for all users')
})

router.post('/:id', function (req, res) {
  res.send(`Post message with ID ${req.params.id}`);
})

export {router}