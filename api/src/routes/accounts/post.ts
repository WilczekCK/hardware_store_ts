import express from "express";

import { createUser, getUsers } from "../../controllers/user.controller";

var router = express.Router();

router.post('/', async (req, res) => {
  const data = await createUser(req.body);

  if ( !data ) {
    return res.status(202).send({ message: "User already exists" });
  }

  res.status(200).send( {message: 'All ok!'} );
})


router.post('/auth', async (req, res) => {
  /* Just for auth use, all other info can be fetched from GET /:id */
  res.send(
    await getUsers(req.body)
  );
})

export {router}