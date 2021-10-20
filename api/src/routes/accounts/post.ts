import express from "express";
var router = express.Router();

router.post('/', async (req, res) => {
  console.log(req);

  res.send(req.body);
})

export {router}