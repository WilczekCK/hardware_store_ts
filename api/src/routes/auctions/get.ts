import express from "express";
var router = express.Router();

router.get('/', function (req, res) {
  res.send('Get all auctions')
})

router.get('/:id', function (req, res) {
  res.send(`Get auction with ID ${req.params.id}`);
})

export {router}