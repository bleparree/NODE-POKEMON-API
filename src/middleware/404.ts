import { Application, Request, Response } from "express";

/** 404 middleware returning an error as the last ressort when no route have been found */
module.exports = (app:Application) => {
    //Manage 404 routes
    app.use((req:Request, res:Response) => {
        res.status(404).json('Impossible de trouver la ressource demandée ! Veuillez essayer une autre url')
    })
}