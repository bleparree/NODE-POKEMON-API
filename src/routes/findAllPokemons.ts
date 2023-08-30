import { Application, Request, Response } from "express";
import { PokemonService } from "../services/pokemonService";
import { Pokemon } from "../models/pokemon";
var { success } = require('../helper');

  /**
   * @swagger
   * /api/pokemons:
   *   get:
   *     summary: Return the entire Pokemon list or a single one with corresponding to the name passed in query parameter
   *     description: Returns a Pokemons list
   *     tags:
   *      - Pokemons
   *     security: 
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: name
   *         required: false
   *         description: Full and exact name of the pokemon to retrieve.
   *         type: string
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
module.exports = (app:Application) => {
    app.get('/api/pokemons', (req:Request, res:Response) => {
        let message = `Hello, vous avez le pokedex !!! le voici !`;
        let pokemonService = new PokemonService();

        pokemonService.getAllPokemon()
            .then((data:Pokemon[]) => {
                let ret:Pokemon[]|undefined = data;
                if (req.query.name) { 
                    ret = data.filter((p:Pokemon) => p.name == req.query.name ); 
                    if (ret.length == 0) {
                        message = 'Il n\'y a pas de Pokemon qui corresponde à ce nom';
                    }
                    else {
                        message = 'Voici le pokemon qui nommé ' + req.query.name;
                    }
                }
                res.status(200).json(success(message, ret));
            })
            .catch((err:any) => {
                console.log(err.message);
                res.status(400).send(err.message);
            });
    });
}