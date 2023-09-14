import { Client } from 'pg';

/** PostGre Database Initizator and accessor */
export class PostgreDbAccessors { 
    public client:any;

    /** Initialize the postegre connection client */
    constructor() {
        this.client = new Client({
            host:"localhost",
            user: "postgres",
            password: "bkzqXWUNAaTfgWyF3VsP",
            port: 5432,
            database: "Pokemon"
        });
    }

    /** Initiate the connection to the database */
    connectDb():void {
        try {
            this.client.connect();
        }
        catch(error){
            console.log(error);
        }
    }

    /** Give a public access to the client */
    getClient():any {
        return this.client;
    }
}
