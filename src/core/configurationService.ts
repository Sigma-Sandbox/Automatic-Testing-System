import { IConfigurationService } from './interfaces'
import { promises } from 'fs'
import config from './config'
import nconf from 'nconf'

export class ConfigurationService implements IConfigurationService {
  private configName = 'config.json'

	async init() {
    // Читаем аргументы и переменные среды
    try {
      nconf.argv().env().file({file: 'config.json'})
    } catch {
      try {
        await promises.writeFile(this.configName, JSON.stringify(config, null, '\t'), 'utf-8')
      } catch (e) {
        console.log(`Не удалось скопировать конфигурационный файл! ${e}`)
      }
    }

    nconf.argv().env().file({file: 'config.json'})
  }

  async getConfiguration(name: string): Promise<any> {
    return nconf.get(name)
  }

  async updateConfiguration(module: string, value: any): Promise<void> {
    nconf.set(module, value)
    nconf.save(promises.readFile(this.configName))
  }
}