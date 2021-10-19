import express from "express";
var router = express.Router();

router.get('/', function (req, res) {
  res.send('Get all accounts')
})

router.get('/:id', function (req, res) {
  res.send(`Get account with ID ${req.params.id}`);
})

export {router}