import { error } from "console";

/**
 * @swagger
 * definitions:
 *   PokemonType:
 *     description: Available Type for a Pokemon
 *     properties:
 *       id:
 *         description: Database id of the pokemonType
 *         type: integer
 *       name:
 *         description: Unique Name of the type (reference in the Pokemon Object)
 *         type: string
 *       color:
 *         description: Color of the Pokemon Type for the UI rendering
 *         type: string
 *       position:
 *         description: Position of the Type in the UI rendering interface
 *         type: integer
 */
export class PokemonType { 
    id: number;
    name: string;
    color: string;
    position: number;

    constructor() {}

    /**
     * Initialize a pokemonType class with a body from a query with id (to update or delete a pokemonType)
     * Also check if all required properties are set (id / name / color / position) 
     * @param body A Query JSON body with Id (to update or delete a pokemonType) 
     */
    initWithReqBodyWithId(body:any) {
        if (body.id && body.name && body.color && body.position) {
            this.id = body.id;
            this.name = body.name;
            this.color = body.color;
            this.position = body.position;
        }
        else {
            throw error('Ce n\'est pas un Type valide');
        }
    }
    
    /**
     * Initialize a pokemon class with a JSON from a DBQuery
     * @param dbData A Database JSON Content with Id
     */
    initWithDBData(dbData:any): PokemonType {
        this.id = dbData.id;
        this.name = dbData.name;
        this.color = dbData.color;
        this.position = dbData._position;
        return this;
    }
}