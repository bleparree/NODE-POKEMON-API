
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';

import configJson from './assets/config.json';
import { middlewareAuth } from "./middleware/auth";
import { middleware404 } from "./middleware/404";
import { middlewareCheckId } from "./middleware/checkId";
import { routeHelloWorld } from "./routes/helloWorld";
import { routeLogin } from "./routes/login";
import { routeAddPokemon } from "./routes/addPokemon";
import { routeUpdatePokemon } from "./routes/updatePokemon";
import { routeDeletePokemon  } from "./routes/deletePokemon";
import { routeFindAllPokemon } from "./routes/findAllPokemons";
import { routePokemonById } from "./routes/pokemonById";
import { routeAddPokemonType } from "./routes/addPokemonType";
import { routeUpdatePokemonType } from "./routes/updatePokemonType";
import { routeDeletePokemonType } from "./routes/deletePokemonType";
import { routeFindAllPokemonType } from "./routes/findAllPokemonType";

export function routes(app:any) {
    /**Initialize Swagger UI */
    const swaggerOptions = {  
      swaggerDefinition: {  
          openapi: '3.0.1',
          info: {  
              title:'Pokemon API',  
              version:'1.0.0'  
          }  
      },
      apis:['app.js','./src/middleware/*.ts','./src/models/*.ts','./src/routes/*.ts']
    }  
    const swaggerDocs = swaggerJSDoc(swaggerOptions);  

    /**Initialize All the routes + CORS Policy */
    // Add a list of allowed origins.
    // If you have more origins you would like to add, you can add them to the array below.
    const options: cors.CorsOptions = {
        origin: configJson.origin
    };
    app.use(cors(options));
    app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));  
    middlewareAuth(app);
    // middlewareCheckId(app);
    routeHelloWorld(app);
    routeLogin(app);
    routeAddPokemon(app);
    routeUpdatePokemon(app);
    routeDeletePokemon(app);
    routeFindAllPokemon(app);
    routePokemonById(app);
    routeAddPokemonType(app);
    routeUpdatePokemonType(app);
    routeDeletePokemonType(app);
    routeFindAllPokemonType(app);
    middleware404(app);
}