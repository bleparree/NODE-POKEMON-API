import { Application, Request, Response } from "express";
import { PokemonTypeService } from "../services/pokemonTypeService";
import { PokemonType } from "../models/pokemonType";
let { success } = require('../helper');

  /**
   * @swagger
   * /api/pokemontype/{id}:
   *   put:
   *     summary: Update a PokemonType
   *     description: Update a PokemonType and return it
   *     tags:
   *      - PokemonTypes
   *     security: 
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the PokemonType to update.
   *         type: integer
   *     requestBody:
   *       description: A PokemonType Object (with id)
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
    app.put('/api/pokemontype/:id', (req:Request, res:Response) => {
        var pokemonService = new PokemonTypeService();
        var updatePokemon = new PokemonType();
        updatePokemon.initWithReqBodyWithId(req.body);
        
        pokemonService.updateType(updatePokemon)
            .then((data:any) => {
                let message = `Le type n°${req.params.id} a été mis à jours`;
                res.status(200).json(success(message, data));
            })
            .catch((err:any) => {
                console.log(err.message);
                res.status(400).send(err.message);
            });
    })
}