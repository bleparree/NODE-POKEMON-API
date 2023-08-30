import { Application, Request, Response } from "express";
import { PokemonTypeService } from "../services/pokemonTypeService";
import { PokemonType } from "../models/pokemonType";
var { success } = require('../helper');

  /**
   * @swagger
   * /api/pokemonType:
   *   post:
   *     summary: Add a new pokemonType
   *     description: Add a new pokemonType and return it
   *     tags:
   *      - PokemonTypes
   *     security: 
   *       - bearerAuth: []
   *     requestBody:
   *       description: A PokemonType Object (without id)
   *       required: true
   *       content: 
   *         application/json:
   *           schema:
   *             $ref: '#/definitions/PokemonType'
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
   *                     description: The PokemonType Object
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
    app.post('/api/pokemonType', (req:Request, res:Response) => {
        var pokemonTypeService = new PokemonTypeService();
        var newPokemonType = new PokemonType();
        newPokemonType.name = req.body.name;
        newPokemonType.color = req.body.color;
        newPokemonType.position = req.body.position;
        
        pokemonTypeService.addType(newPokemonType)
            .then((data:any) => {
                let message = `Le type ${data.type} a été créé`;
                res.status(200).json(success(message, data));
            })
            .catch((err:any) => {
                console.log(err.message);
                res.status(400).send(err.message);
            });
    })
}