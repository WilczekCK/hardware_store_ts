import express from "express";
import { modifyUser } from "../../controllers/user.controller";

var router = express.Router();

router.put('/', async (req, res) => {
  const { where, set } = req.body; 
  const { affected, raw } :any = await modifyUser( { where, set } )

  if ( affected > 0 ) {
    return res.send( {status: 200, message: `${affected} result modified, all ok`} );
  }

  res.send( {status: 202, message: `No results`} );
})

router.put('/:id', async (req, res) => {
  const { where, set } = req.body; 
  const { affected, raw } :any = await modifyUser( { where:{id:req.params.id}, set } )

  if ( affected === 0 ) {
    return res.status(400).send( {status: 400, message: `No results`} );
  }
  
  return res.status(200).send( {status: 200, message: `${affected} results modified, all ok`} );
})

export {router}