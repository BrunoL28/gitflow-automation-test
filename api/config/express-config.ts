import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { getEnv } from "../utils/get-env";

dotenv.config();

export const app: Express = express();

const options : CorsOptions = {
    origin: getEnv( "CLIENT_URL" ),
    credentials: true,
};

app.use( cors( options ) );

app.use( express.urlencoded( {
    extended: true,
} ) );

app.use( express.json() );

import { router as TaskRouter } from "../src/domains/Tasks/Controllers";

app.use( "/api/tasks", TaskRouter );

import { errorHandler } from "../src/middlewares/errorHandler";

app.use( errorHandler );
