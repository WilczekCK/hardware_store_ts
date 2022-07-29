import express, { Application } from "express";
import { passport, session } from "./controllers/passportjs.controller";

const app: Application = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000/');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-PINGOTHER, X-CSRF-TOKEN');
  next();
});
  
// Bigger payloads, needed for base64 images upload!
app.use(express.json({limit: '50mb'}));

// All related to sessions
app.use(session({
    secret: 'secret key for session',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session()); 

export {app, express};