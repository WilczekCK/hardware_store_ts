import express from "express";
var router = express.Router();

router.put('/:id', function (req, res) {
  res.send(`Update message with ID ${req.params.id}`);
})

export {router}