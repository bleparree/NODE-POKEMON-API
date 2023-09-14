import { Application, Request, Response } from "express";
import { PokemonService } from "../services/pokemonService";
import { Pokemon } from "../models/pokemon";
import { success } from '../helper';

  /**
   * @swagger
   * /api/pokemon/{id}:
   *   put:
   *     summary: Update a Pokemon
   *     description: Update a Pokemon and return it
   *     tags:
   *      - Pokemons
   *     security: 
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the pokemon to update.
   *         type: integer
   *     requestBody:
   *       description: A Pokemon Object (with id)
   *       required: true
   *       content: 
   *         application/json:
   *           schema:
   *             $ref: '#/definitions/Pokemon'
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
   *                     $ref: '#/definitions/Pokemon'
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
export function routeUpdatePokemon(app:Application) {
    app.put('/api/pokemon/:id', (req:Request, res:Response) => {
        var pokemonService = new PokemonService();
        var newPokemon = new Pokemon();
        newPokemon.initWithReqBodyWithId(req.body);
        
        pokemonService.updatePokemon(newPokemon)
            .then((data:any) => {
                let message = `Le pokemon n°${req.params.id} a été mis à jours`;
                res.status(200).json(success(message, data));
            })
            .catch((err:any) => {
                console.log(err.message);
                res.status(400).send(err.message);
            });
    })
}