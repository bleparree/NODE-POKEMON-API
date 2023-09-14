import { Application, Request, Response } from "express";
import { Pokemon } from "../models/pokemon";
import { PokemonService } from "../services/pokemonService";
import { success } from '../helper';

  /**
   * @swagger
   * /api/pokemon:
   *   post:
   *     summary: Add a new Pokemon
   *     description: Add a new Pokemon and return it
   *     tags:
   *      - Pokemons
   *     security: 
   *       - bearerAuth: []
   *     requestBody:
   *       description: A Pokemon Object (without id)
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
export function routeAddPokemon(app:Application) {
    app.post('/api/pokemon', (req:Request, res:Response) => {
        var pokemonService = new PokemonService();
        var newPokemon = new Pokemon();
        newPokemon.initWithReqBodyWithoutId(req.body);
        
        pokemonService.addPokemon(newPokemon)
            .then((data:any) => {
                let message = `Le pokemon n°${data.name} a été créé`;
                res.status(200).json(success(message, data));
            })
            .catch((err:any) => {
                console.log(err.message);
                res.status(400).send(err.message);
            });
    })
}