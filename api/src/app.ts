import express, { Application } from "express";
import { passport, session, SQLiteStore } from "./controllers/passportjs.controller";

const app: Application = express();

app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
    store: new SQLiteStore({ db: 'sessions.db' })
}))

app.use(passport.initialize());
app.use(passport.session());


export {app, express};