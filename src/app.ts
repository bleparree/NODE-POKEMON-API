import { PokemonService } from "./services/pokemonService";
import configJson from './assets/config.json';

const express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUI = require('swagger-ui-express');
var { cacheService } = require('./services/constExportModule');

/**Initialize Express */
const app = express();
const port = 3000;
app
  .use(morgan('dev'))
  .use(favicon(__dirname = './favicon.ico'))
  .use(bodyParser.json());

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

/**Initialize CacheService + Call All Pokemon to fill it */
cacheService.postgreDbAccessors.connectDb();
(new PokemonService()).getAllPokemon();
 
/**Initialize All the routes + CORS Policy */
const cors = require('cors');
app.use(cors(configJson.origin));
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));  
require('./middleware/auth')(app);
require('./middleware/checkId')(app);
require('./routes/login')(app);
require('./routes/helloWorld')(app);
require('./routes/findAllPokemons')(app);
require('./routes/pokemonById')(app);
require('./routes/addPokemon')(app);
require('./routes/updatePokemon')(app);
require('./routes/deletePokemon')(app);
require('./routes/findAllPokemonType')(app);
require('./routes/addPokemonType')(app);
require('./routes/updatePokemonType')(app);
require('./routes/deletePokemonType')(app);
require('./middleware/404')(app);

/**Run the service */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
