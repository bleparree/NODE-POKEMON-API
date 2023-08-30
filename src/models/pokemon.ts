import { error } from "console";

/**
 * @swagger
 * definitions:
 *   Pokemon:
 *     description: Pokemon class
 *     properties:
 *       id:
 *         description: Pokemon DB Id
 *         type: integer
 *       name:
 *         description: Unique Name of the pokemon
 *         type: string
 *       hp:
 *         description: HP of the pokemon (between 1 and 99)
 *         type: integer
 *       cp:
 *         description: Attack of the pokemon (between 1 and 99)
 *         type: integer
 *       picture:
 *         description: Photo of the pokemon (including http if it come from internet)
 *         type: string
 *       types:
 *         description: List of string containing "pokemonTypes > Name"
 *         type: array
 *         items: 
 *           type: string
 *       created:
 *         description: Date where the Pokemon have been created
 *         type: string
 *         format: date
 */
export class Pokemon { 
    id: number;
    name: string;
    hp: number;
    cp: number;
    picture: string;
    types: Array<string>;
    created: Date;

    /**
     * Initialize Pokemon class with an empty list of Type and a default picture url
     */
    constructor() {
        this.picture = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png';
        this.types = [];
    }
    
    /**
     * Initialize a pokemon class with a body from a query without id (to create a pokemon)
     * Also check if all required properties are set (name / hp / cp / picture / types) 
     * @param body A Query JSON body without Id (to create a pokemon) 
     */
    initWithReqBodyWithoutId(body:any) {
        if (body.name && body.hp && body.cp && body.picture && body.types) {
            this.name = body.name;
            this.hp = body.hp;
            this.cp = body.cp;
            this.picture = body.picture;
            this.types = body.types;
        }
        else {
            throw error('Ce n\'est pas un Pokemon valide');
        }
    }

    /**
     * Initialize a pokemon class with a body from a query with id (to update or delete a pokemon)
     * Also check if all required properties are set (id / name / hp / cp / picture / types) 
     * @param body A Query JSON body with Id (to update or delete a pokemon) 
     */
    initWithReqBodyWithId(body:any) {
        if (body.id && body.name && body.hp && body.cp && body.picture && body.types) {
            this.id = body.id;
            this.name = body.name;
            this.hp = body.hp;
            this.cp = body.cp;
            this.picture = body.picture;
            this.types = body.types;
        }
        else {
            throw error('Ce n\'est pas un Pokemon valide');
        }
    }
}