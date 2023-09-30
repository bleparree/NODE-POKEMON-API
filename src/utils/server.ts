import express from "express";
import morgan from 'morgan';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import { routes } from "../routes";

export function createServer() {
    const app = express();
    app
        .use(morgan('dev'))
        .use(favicon(__dirname = './favicon.ico'))
        .use(bodyParser.json());

    routes(app);

    return app;
}