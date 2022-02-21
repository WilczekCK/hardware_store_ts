import {app, express} from './app';

import morgan from "morgan";
import Router from "./routes";
import "reflect-metadata";
import { createConnection } from "typeorm";

import dbConfig from "./config/database";

const PORT = process.env.PORT || 8000;

app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(Router);

//DB CONNECTION
createConnection(dbConfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
});

export { createConnection }