import express from "express";
import { modifyAuction } from "../../controllers/auction.controller";

var router = express.Router();

router.put('/', async (req, res) => {
  const { where, set } = req.body; 
  const { affected, raw } :any = await modifyAuction( { where, set } )

  if ( affected > 0 ) {
    return res.send( {status: 200, message: `${affected} result modified, all ok`} );
  }

  res.send( {status: 202, message: `No results`} );
})

router.put('/:id', async (req, res) => {
  const { where, set } = req.body; 
  const { affected, raw } :any = await modifyAuction( { where:{id:req.params.id}, set } )

  if ( affected > 0 ) {
    return res.send( {status: 200, message: `${affected} result modified, all ok`} );
  }

  res.send( {status: 202, message: `No results`} );
})

export {router}