import { Application, Request, Response } from "express";
import { PokemonTypeService } from "../services/pokemonTypeService";
var { success } = require('../helper');

  /**
   * @swagger
   * /api/pokemontype/{id}:
   *   delete:
   *     summary: Delete a PokemonType
   *     description: Delete a PokemonType and true if succeed to
   *     tags:
   *      - PokemonTypes
   *     security: 
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the pokemonType to delete.
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
    app.delete('/api/pokemontype/:id', (req:Request, res:Response) => {
        var pokemonTypeService = new PokemonTypeService();
        pokemonTypeService.deleteTypeByid(Number(req.params.id))
            .then((data:any) => {
                let message = `Le type ${req.params.id} a été supprimé`;
                res.status(200).json(success(message, data));
            })
            .catch((err:any) => {
                console.log(err.message);
                res.status(400).send(err.message);
            });
    })
}