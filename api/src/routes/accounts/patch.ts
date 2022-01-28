import express from "express";
import { modifyUsers } from "../../controllers/user.controller";


var router = express.Router();

router.patch('/', async (req, res) => {
  const { where, set } = req.body;
  const { affected, raw } :any = await modifyUsers( { where, set } ) // () => results how many changed

  if ( affected > 0 ) {
    return res.send( {status: 200, message: `${affected} results modified, all ok`} );
  }

  res.send( {status: 202, message: `No results`} );
})

export {router}