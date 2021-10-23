import express from "express";
import { modifyUser } from "../../controllers/user.controller";

var router = express.Router();

router.put('/', async (req, res) => {
  const { where } = req.body; // () => { id: [number] }
  const { affected, raw } :any = await modifyUser( { where } ) // () => results how many deleted

  if ( affected > 0 ) {
    return res.send( {status: 200, message: `${affected} result modified, all ok`} );
  }

  res.send( {status: 202, message: `No results`} );
})

export {router}