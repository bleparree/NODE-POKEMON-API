import { Application, NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { privateKey } from "../auth/private_key";

/**
 * @swagger
 * tags:
 *   - name: Default
 *     description: HelloWorld & Login
 *   - name: Pokemons
 *     description: Toutes les opérations pour les pokemon
 *   - name: PokemonTypes
 *     description: Toutes les opérations pour les pokemonType
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * definitions:
 *   AuthError:
 *     properties:
 *       name:
 *         name: string
 *       message:
 *         type: string
 *       expiredAt:
 *         type: string
 */

/** Authentification Middleware checking the auth otken */
export function middlewareAuth(app:Application){
    app.use('/api/*', (req:Request, res:Response, next:NextFunction) => {
        if (req.baseUrl.endsWith('/login')) {
            return next();
        }

        if (req.method != 'OPTIONS') {
            if (!req.headers.authorization) {
                return res.status(401).json('No Token provided')
            }

            const token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, privateKey, (error:any, decodedToken:any) => {
                if (error) {
                    return res.status(401).json({ message: 'Invalid Token', error})
                }
                else {
                    next();
                }
            });
        }
        else {
            next();
        }
    })
}