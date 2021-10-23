import express from "express";
import { removeUsers } from "../../controllers/user.controller";

var router = express.Router();

router.delete('/', async (req, res) => {  
  const { where } = req.body; // () => { id: [number] }
  const { affected, raw } :any = await removeUsers( { where } ) // () => results how many deleted

  if ( affected > 0 ) {
    return res.send( {status: 200, message: `${affected} results removed, all ok`} );
  }

  res.send( {status: 202, message: `No results`} );
})

export {router}