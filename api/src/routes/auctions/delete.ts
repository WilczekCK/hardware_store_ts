import express from "express";
var router = express.Router();

router.delete('/', function (req, res) {
  res.send('Delete all items from auctions')
})

router.delete('/:id', function (req, res) {
  res.send(`Delete auction with ID ${req.params.id}`);
})

export {router}