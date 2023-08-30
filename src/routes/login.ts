import { Application, Request, Response } from "express"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const privateKey = require('../auth/private_key')

var { cacheService } = require('../services/constExportModule');

  /**
   * @swagger
   * /api/login:
   *   post:
   *     summary: Log to the application
   *     description: Log to the application
   *     tags: 
   *       - Default
   *     parameters:
   *       - name: username
   *         description: User's username.
   *         in: query
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: login success and provide token information
   *         content: 
   *           'application/json': 
   *             schema:
   *               properties:
   *                 message:
   *                   description: Return a message informing your login is correct
   *                   message: string
   *                 token:
   *                   description: The Token to provide again when you will consume Pokemon Api Points
   *                   type: string
   *       '401':
   *         description: login failed
   *         content: 
   *           'application/json': 
   *             schema:
   *               properties:
   *                 message:
   *                   description: Return a message informing your login is incorrect
   *                   message: string
   *                 data:
   *                   description: No data/information
   *                   type: string
   */
module.exports = (app:Application) => {
    app.post('/api/login', (req:Request, res:Response) => {
        console.log(req.query.password);
        let pass:string = (req.query.password ? req.query.password.toString() : '');
        bcrypt.compare(pass, cacheService.user.password).then(validity => {
            if (validity && req.query.username === cacheService.user.username) {
                const token = jwt.sign({ username: req.query.username }, privateKey, { expiresIn: '24h' })

                return res.json({ message:'L\'utilisateur a été connecté avec succès', token })
            }
            else {
                return res.status(401).send({ message:'Identifiant incorrect', data: '' })
            }
        });
    });
}