import express, { Application } from "express";
import { passport, session } from "./controllers/passportjs.controller";

const app: Application = express();

app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}))

app.use(passport.initialize());
app.use(passport.session());


export {app, express};