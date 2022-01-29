import express from "express";
import { removeAuctions } from "../../controllers/auction.controller";

var router = express.Router();

router.delete('/', async (req, res) => {  
  const { where } = req.body; // () => { id: [number] }
  const { affected, raw } :any = await removeAuctions( { where } ) // () => results how many deleted

  if ( affected > 0 ) {
    return res.send( {status: 200, message: `${affected} results removed, all ok`} );
  }

  res.send( {status: 202, message: `No results`} );
})

router.delete('/:id', async (req, res) => {  
  const { affected, raw } :any = await removeAuctions( { where: [{id: req.params.id}]} ) // () => results how many deleted

  if ( affected > 0 ) {
    return res.send( {status: 200, message: `${affected} results removed, all ok`} );
  }

  res.send( {status: 202, message: `No results`} );
})

export {router}