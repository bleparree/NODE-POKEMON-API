import { Pokemon } from "../models/pokemon";
import { cacheService } from "./constExportModule";

/** Pokemon Service => All DB Call to get / add / update / delete a pokemon */
export class PokemonService{

    /**
     * Get All Pokemon in database
     * @returns A list of Pokemon
     */
    getAllPokemon():Promise<Pokemon[]> {
        return new Promise((resolve, reject) => {
            let query:string = `SELECT * from pokemon.getallpokemon()`;
            cacheService.postgreDbAccessors.getClient().query(query, (err:any, data:any) => {
                if (err) return reject(err)
                cacheService.updateCache(data.rows);
                resolve(data.rows)
            })
        })
    }

    /**
     * Get a single Pokemon with his id
     * @param _id Id of the pokemon to retrieve
     * @returns The corresponding Pokemon
     */
    getPokemonById(_id:Number):Promise<Pokemon> {
        let query:string = `SELECT * from pokemon.getpokemonbyid(${_id})`;
        return new Promise((resolve, reject) => {
            cacheService.postgreDbAccessors.getClient().query(query, (err:any, data:any) => {
                if (err) return reject(err)
                resolve(data.rows[0])
            })
        })
    }

    /**
     * Add a new Pokemon
     * @param newPokemon The pokemon to add
     * @returns The added pokemon
     */
    addPokemon(newPokemon:Pokemon):Promise<Pokemon> {
        if (cacheService.pokemonList.find((p:Pokemon) => p.name == newPokemon.name)) {
            return new Promise((resolve, reject) => {
                var err = { message: 'Le nom de ce Pokemon existe déjà dans la base !'};
                return reject(err);
            })
        }

        let query:string = `
            select pokemon.createpokemon(
                '${newPokemon.name}', 
                ${newPokemon.hp}, 
                ${newPokemon.cp}, 
                '${newPokemon.picture}', 
                '{${newPokemon.types}}');
        `;

        return new Promise((resolve, reject) => {
            cacheService.postgreDbAccessors.getClient().query(query, (err:any, data:any) => {
                if (err) return reject(err);
                newPokemon.id = data.rows[0].createpokemon;
                cacheService.pokemonList.push(newPokemon);
                resolve(newPokemon);
            })
        })
    }

    /**
     * Delete a pokemon following the id in paramter
     * @param _id Pokemon Id to delete
     * @returns True if succeeded
     */
    deletePokemonByid(_id:number):Promise<boolean> {
        let query:string = `select pokemon.deletepokemon(${_id})`;
        return new Promise((resolve, reject) => {
            cacheService.postgreDbAccessors.getClient().query(query, (err:any, data:any) => {
                if (err) return reject(err)
                if (data.rows[0].deletepokemon && data.rows[0].deletepokemon == true) {
                    cacheService.removePokemonFromCache(_id)
                    resolve(data.rows[0].deletepokemon)
                }
                else
                    return reject(({ message: 'Aucun pokemon n\'a pu être supprimé !'}))
            })
        })
    }

    /**
     * Update a Pokemon
     * @param updatePokemon The Pokemon to update
     * @returns The updated Pokemon
     */
    updatePokemon(updatePokemon:Pokemon):Promise<Pokemon> {
        let query:string = `
            select pokemon.updatepokemonbyid(
                '${updatePokemon.id}', 
                '${updatePokemon.name}', 
                ${updatePokemon.hp}, 
                ${updatePokemon.cp}, 
                '${updatePokemon.picture}', 
                '{${updatePokemon.types}}');
        `;

        return new Promise((resolve, reject) => {
            cacheService.postgreDbAccessors.getClient().query(query, (err:any, data:any) => {
                if (err) return reject(err);
                let index = cacheService.pokemonList.findIndex((p:Pokemon) => p.id == updatePokemon.id);
                cacheService.pokemonList[index] = updatePokemon;
                resolve(data.rows[0]);
            })
        })
    }
}