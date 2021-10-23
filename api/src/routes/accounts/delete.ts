import express from "express";
import { DeleteResult } from "typeorm";

import { removeUsers } from "../../controllers/user.controller";

var router = express.Router();

router.delete('/', async (req, res) => {  
  const { where } = req.body; // () => { id: [number] }
  let { affected, raw } :any = await removeUsers( { where } ) // () => results how many deleted

  if ( affected > 0 ) {
    res.send( {status: 200, message: `${affected} results removed, all ok`} );
  }

  res.send( {status: 202, message: `No results`} );
})

export {router}