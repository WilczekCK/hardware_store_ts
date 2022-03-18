import express from "express";
import { getAuctions } from "../../controllers/auction.controller";


var router = express.Router();

router.get('/', async (req, res) => {
  res.send(
    await getAuctions( req.body.length ? req.body : req.query )
  );
})

router.get('/:id', async (req, res) => {
  res.send(
    await getAuctions( { 
      where: { id: parseInt(req.params.id) }, 
      relations: ["user"],
      ...req.body 
    })
  );
})

export {router}