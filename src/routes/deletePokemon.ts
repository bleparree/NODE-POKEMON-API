import { Application, Request, Response } from "express";
import { PokemonService } from "../services/pokemonService";
let { success } = require('../helper');

  /**
   * @swagger
   * /api/pokemon/{id}:
   *   delete:
   *     summary: Delete a Pokemon
   *     description: Delete a Pokemon and true if succeed to
   *     tags:
   *      - Pokemons
   *     security: 
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the pokemon to delete.
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
   *                   type: boolean
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
    app.delete('/api/pokemon/:id', (req:Request, res:Response) => {
        var pokemonService = new PokemonService();
        pokemonService.deletePokemonByid(Number(req.params.id))
            .then((data:any) => {
                let message = `Le pokemon ${req.params.id} a été supprimé`;
                res.status(200).json(success(message, data));
            })
            .catch((err:any) => {
                console.log(err.message);
                res.status(400).send(err.message);
            });
    })
}