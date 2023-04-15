import { IConfigurationService } from './interfaces'
import { promises } from 'fs'
import config from './config'
import path from 'path'
import nconf from 'nconf'

export class ConfigurationService implements IConfigurationService {
  private configName = 'config.json'

	async init() {
    const configPath = path.join(process.cwd(), this.configName)

    // Читаем аргументы и переменные среды
    try {
      await promises.access(configPath)
    } catch {
      try {
        await promises.writeFile(configPath, JSON.stringify(config, null, '\t'), 'utf-8')
      } catch (e) {
        console.log(`Не удалось скопировать конфигурационный файл! ${e}`)
      }
    }

    nconf.argv().env().file({file: configPath })
  }

  async getConfiguration(name: string): Promise<any> {
    return nconf.get(name)
  }

  async updateConfiguration(module: string, value: any): Promise<void> {
    nconf.set(module, value)
    nconf.save(promises.readFile(this.configName))
  }
}