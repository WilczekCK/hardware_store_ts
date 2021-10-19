import express from "express";
var router = express.Router();

router.get('/', function (req, res) {
  res.send('Get all messages from actual user')
})

router.get('/:id', function (req, res) {
  res.send(`Get message with ID ${req.params.id}`);
})

export {router}