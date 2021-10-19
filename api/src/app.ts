import express, { Application } from "express";

const app: Application = express();

global.__basedir = __dirname;

export {app, express};