import { Application, Request, Response } from "express"

/** 
 * @swagger 
 * /: 
 *   get: 
 *     tags: 
 *       - Default
 *     summary: Simply return a Hello World !
 *     description: Simply return a Hello World !
 *     responses:  
 *       200: 
 *         description: Success  
 *         content: 
 *           'text/plain': 
 *             schema: 
 *               type: string
 *               example: HelloWorld 
 *   
 */  
module.exports = (app:Application) => {
    app.get('/', (req:Request, res:Response) => {
        res.status(200).send('Hello World !')
    })
};