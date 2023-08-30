import { PokemonType } from "../models/pokemonType";
var { cacheService } = require('./constExportModule');

/** PokemonType Service => All DB Call to get / add / update / delete a pokemonType */
export class PokemonTypeService{

    /**
     * Get All Pokemon Type
     * @returns A list of PokemonType
     */
    getAllType():Promise<PokemonType[]> {
        return new Promise((resolve, reject) => {
            let query:string = `SELECT * from pokemon.getalltypes()`;
            cacheService.postgreDbAccessors.getClient().query(query, (err:any, data:any) => {
                if (err) return reject(err)
                resolve(data.rows)
            });
        })
    }

    /**
     * Add a new PokemonType
     * @param newType The PokemonType to add (without id)
     * @returns The created pokemonType (with the new generated id)
     */
    addType(newType:PokemonType):Promise<PokemonType> {
        let query:string = `select pokemon.createtype('${newType.name}', '${newType.color}', '${newType.position}');`;

        return new Promise((resolve, reject) => {
            cacheService.postgreDbAccessors.getClient().query(query, (err:any, data:any) => {
                if (err) return reject(err);
                newType.id = data.rows[0].createtype;
                resolve(newType);
            })
        })
    }

    /**
     * Update a Pokemon Type
     * @param updateType The Pokemon Type to update
     * @returns The updated PokemonType
     */
    updateType(updateType:PokemonType):Promise<PokemonType> {
        let query:string = `
            select pokemon.updatetypebyid(
                ${updateType.id}, 
                '${updateType.name}', 
                '${updateType.color}', 
                ${updateType.position});
        `;

        return new Promise((resolve, reject) => {
            cacheService.postgreDbAccessors.getClient().query(query, (err:any, data:any) => {
                if (err) return reject(err);
                resolve(data.rows[0]);
            })
        })
    }

    /**
     * Delete a Pokemon Type
     * @param _id The Pokemon Type Id to delete
     * @returns True if succeeded
     */
    deleteTypeByid(_id:Number):Promise<boolean> {
        let query:string = `select pokemon.deletetype(${_id})`;
        return new Promise((resolve, reject) => {
            cacheService.postgreDbAccessors.getClient().query(query, (err:any, data:any) => {
                if (err) return reject(err)
                if (data.rows[0].deletetype && data.rows[0].deletetype == true) {
                    resolve(data.rows[0].deletetype)
                }
                else
                    return reject(({ message: 'Aucun type n\'a pu être supprimé !'}))
            })
        })
    }
}