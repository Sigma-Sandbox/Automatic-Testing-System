import { DbConfig } from './interfaces'
import { Client, DatabaseError, Pool } from 'pg'
import { ConfigurationService } from './configurationService'

async function createAppUser(dbConfig: DbConfig) {
  console.log(`Не удалось подключиться к ${dbConfig.database}. Попытка создать базу данных`)

  const adminClient = new Client({
    user: dbConfig.superuser,
    host: dbConfig.host,
    password: dbConfig.superuserPassword,
    port: dbConfig.port
  })

  try {
    await adminClient.connect()
    console.log(`Подключение к БД с правами superuser'a!`)

    const users = await adminClient.query('SELECT * FROM pg_user')
    const usernames = users.rows.map((row: any) => row.usename)
    if (!usernames.includes(dbConfig.username)) {
      await adminClient.query(`CREATE USER ${dbConfig.username} WITH CREATEDB PASSWORD '${dbConfig.userPassword}'`)
      console.log(`Создана учетная запись ${dbConfig.username}!`)
    }

    const databases = await adminClient.query('SELECT * FROM pg_database')
    const databaseNames = databases.rows.map((row: any) => row.datname)
    if (!databaseNames.includes(dbConfig.database)) {
      await adminClient.query(`CREATE DATABASE ${dbConfig.database}`)
      console.log(`Создана база данных ${dbConfig.database}!`)
    }
  } catch (err: any) {
    switch (err.code) {
      case '3D000':
        throw new Error('Не удалось подключиться к базе данных! Неверное имя базы данных!')
      case '42P04':
        throw new Error(`База данных ${dbConfig.database} уже существует!`)
      case '42710':
        throw new Error(`Учётная запись с именем ${dbConfig.username} уже существует!`)
      case '28P01':
        throw new Error(`Учётная запись ${dbConfig.superuser} не прошла проверку подлинности: неверный логин или пароль!`)
      case '42601':
        throw new Error('Ошибка в синтаксисе запроса!')
      case 'ECONNREFUSED':
        throw new Error('Невозможно подключиться к базе данных: ошибка подключения. Проверьте, запущен ли сервис PosgreSQL, а также адрес и порт!')
      case 'ETIMEOUT':
        throw new Error(`Узел ${dbConfig.host} недоступен`)
      case 'ENOTFOUND':
        throw new Error(`Узел ${dbConfig.host} не найден. Проверьте корректность адреса узла`)
      default:
        console.log(err, err.code)
        throw new Error('Возникли проблемы при подключении к базе данных!')
    }
  }
}

async function connectAppUser(dbConfig: DbConfig) {
  const appPool = new Pool({
    user: dbConfig.username,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.userPassword,
    port: dbConfig.port,
  })

  try {
    await appPool.connect()
    console.log(`Подключение к БД ${dbConfig.database} с помощью учетной записи ${dbConfig.username} успешно!`)
    return appPool
  } catch (err) {
    if (!(err instanceof DatabaseError)) {
      throw new Error('Неизвестная ошибка при подключении к базе данных')
    }
    switch (err.code) {
      case '3D000':
        throw new Error('Не удалось подключиться к базе данных! Неверное имя базы данных!')
      case '28P01':
        throw new Error(`Учётная запись ${dbConfig.username} не прошла проверку подлинности: неверный логин или пароль!`)
      default:
        throw new Error('Возникли проблемы при подключении к базе данных!')
    }
  }
}

export async function connectPostgreSQL(configurationService: ConfigurationService): Promise<Pool> {
  const conf = await configurationService.getConfiguration('dbConfig')
  const dbConfig: DbConfig = {
    host: conf && conf.host ? conf.host : 'localhost',
    port: conf && conf.port ? conf.port : 5432,
    username: conf && conf.user ? conf.user : 'sigma_ats',
    userPassword: conf && conf.userPassword ? conf.userPassword : 'sigma_ats',
    superuser: 'postgres',
    superuserPassword: conf && conf.superuserPassword ? conf.superuserPassword : 'postgres',
    database: conf && conf.database ? conf.database : 'sigma_ats',
  }

  try {
    return await connectAppUser(dbConfig)
  } catch (err) {
    await createAppUser(dbConfig)
  }
  return await connectAppUser(dbConfig)
}