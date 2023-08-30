import { CacheService } from "./cacheService";

/** Initialize and export as a module the Application Cache */
const cacheService = new CacheService();
module.exports = { cacheService };