import { ConfigurationService } from './core/configurationService'
import { StorageService } from './core/storageService'
import { connectPostgreSQL } from './core/dbConnection'

const configurationService = new ConfigurationService()
const storageService = new StorageService()
connectPostgreSQL(configurationService).then(pool => storageService.setPool(pool))