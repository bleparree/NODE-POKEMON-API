import { Application, Request, Response } from "express";
import { PokemonService } from "../services/pokemonService";
import { Pokemon } from "../models/pokemon";
let { success } = require('../helper');

/**
 * @swagger
 * /api/pokemon/{id}:
 *   get:
 *     summary: Retrieve your Pokemon by it's own id
 *     description: Retrieve a single Pokemon
 *     tags:
 *      - Pokemons
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the pokemon to retrieve.
 *         type: integer
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
 *                   description: The Pokemon Object
 *                   $ref: '#/definitions/Pokemon'
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
    app.get('/api/pokemon/:id', (req:Request, res:Response) => {
        let pokemonService = new PokemonService();
        pokemonService.getPokemonById(Number(req.params.id))
            .then((data:any) => {
                let spok:Pokemon = data.rows[0];
                let message = `Hello, vous avez demandé le pokemon n°${req.params.id} qui est ${spok?.name}`;
                res.status(200).json(success(message, data.rows));
            })
            .catch((err:any) => {
                console.log(err.message);
                res.status(400).send(err.message);
            });
    });
}