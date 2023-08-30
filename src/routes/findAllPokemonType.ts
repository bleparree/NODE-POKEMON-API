import { Application, Request, Response } from "express";
import { PokemonTypeService } from "../services/pokemonTypeService";
import { PokemonType } from "../models/pokemonType";
var { success } = require('../helper');

  /**
   * @swagger
   * /api/pokemontypes:
   *   get:
   *     summary: Return all Pokemon Types
   *     description: Returns a PokemonType list
   *     tags:
   *      - PokemonTypes
   *     security: 
   *       - bearerAuth: []
   *     responses:
   *       '200':
   *         description: OK
   *         content: 
   *           'application/json': 
   *             schema:
   *               properties:
   *                 message:
   *                   description: Message of information
   *                   type: string
   *                 data:
   *                   type: array
   *                   items:
   *                     description: The Pokemon Object
   *                     $ref: '#/definitions/PokemonType'
   *       '400':
   *         description: Common Error Catched by the application
   *         content: 
   *           'application/json': 
   *             schema:
   *               properties:
   *                 message:
   *                   description: Message of information
   *                   type: string
   *                 data:
   *                   description: Catched error
   *                   type: string
   *       '401':
   *         description: Application failed to authentificate you
   *         content: 
   *           'application/json': 
   *             schema:
   *               properties:
   *                 message:
   *                   description: Message of information
   *                   type: string
   *                 error:
   *                   description: Auth error
   *                   $ref: '#/definitions/AuthError'
   */
module.exports = (app:Application) => {
    app.get('/api/pokemontypes', (req:Request, res:Response) => {
        let message = `Hello, voici l'ensemble des types de pokemon possible !`;
        let pokemonTypeService = new PokemonTypeService();

        pokemonTypeService.getAllType()
            .then((data:PokemonType[]) => {
                let ret:PokemonType[]|undefined = [];
                data.forEach(element => {
                    let pt = new PokemonType();
                    console.log(element);
                    ret?.push(pt.initWithDBData(element));
                });
                res.status(200).json(success(message, ret));
            })
            .catch((err:any) => {
                console.log(err.message);
                res.status(400).send(err.message);
            });
    });
}