import { Application, NextFunction, Request, Response } from "express";
import { Pokemon } from "../models/pokemon";

let { cacheService } = require('../services/constExportModule');

/** Middleware for every pokemon access point requiring and id to check if the requested pokemon id exist or not */
module.exports = (app:Application) => {
    app.use('/api/pokemon/:id', (req:Request, res:Response, next:NextFunction) => {
        try 
        {
            if (Number.isInteger(Number(req.params.id))) {
                let spok = cacheService.pokemonList.find((p:Pokemon) => p.id == Number(req.params.id));
                if (spok) {
                    next();
                }
                else {
                    let error = `Le pokemon recherché n'existe pas ==> ${req.params.id}`;
                    console.error(error);
                    res.status(404).send(error);
                }
            }
            else {
                let error = `Le paramêtre transmis n'est pas un entier valide ==> ${req.params.id}`;
                console.error(error);
                res.status(400).send(error);
            }
        } catch(error) {
            res.status(400).send('Unexpected error');
        }
    });
};