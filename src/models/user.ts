import bcrypt from 'bcrypt';

/**
 * User class used to connect to the API
 */
export class User{
    username:string;
    password:string;

    /**
     * Initialize the user class with a defaut username and a default hash password
     * Those informations should be provided by the database in a definitive app
     */
    constructor() {
        this.username = 'pikachu';
        bcrypt.hash('pikachu', 10).then((h:any) => this.password = h);
    }
}