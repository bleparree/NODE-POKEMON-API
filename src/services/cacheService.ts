import { Pokemon } from "../models/pokemon";
import { PostgreDbAccessors } from "../dbaccessors/postgreDbAccessors";
import { User } from "../models/user";

/** Class of the application Cache to provide in the entire application a single version of everything inside */
export class CacheService { 
    /** DbAccessor => to initiate a single connection only to the database */
    public postgreDbAccessors:PostgreDbAccessors;
    /** A cached version of the entire Pokemon List (to check fast if a Pokemon id exist) */
    public pokemonList:Pokemon[];
    /** Quick Access to the unique auth user */
    public user:User;

    /** Initiliaze cache */
    constructor() {
        this.postgreDbAccessors = new PostgreDbAccessors();
        this.pokemonList = [];
        this.user = new User();
    }

    /** Update the Pokemon List in cache */
    updateCache(updateList:Pokemon[]):void {
        this.pokemonList = updateList;
    }

    /** Remove a Pokemon From the cache */
    removePokemonFromCache(_id:number):void {
        let index = this.pokemonList.findIndex((p:Pokemon) => p.id == _id);
        if (index > -1) {
            this.pokemonList.splice(index, 1);
        }
    }
}
