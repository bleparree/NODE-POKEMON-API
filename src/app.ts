import { createServer } from "./utils/server";
import { PokemonService } from "./services/pokemonService";
import { cacheService } from './services/constExportModule';

/**Initialize Express */
const app = createServer();
const port = 3000;

/**Initialize CacheService + Call All Pokemon to fill it */
cacheService.postgreDbAccessors.connectDb();
(new PokemonService()).getAllPokemon();

/**Run the service */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
