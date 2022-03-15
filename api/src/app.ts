import express, { Application } from "express";
import { passport, session, SQLiteStore } from "./controllers/passportjs.controller";

const app: Application = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.db', dir: './' })
}))

app.use(passport.initialize());
app.use(passport.authenticate('session'));


export {app, express};