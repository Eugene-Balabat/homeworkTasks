import { connectionData } from '../../orm.config'
import { DatabaseServiceConfig } from './db-client.interface'
import { UserTable } from './db-client.models'
import { DataSource, DataSourceOptions } from 'typeorm'
import md5 from 'md5'
import { RedisService } from 'services/redis/redis.service'

export class DatabaseService {
    private client: DataSource

    constructor(config?: DataSourceOptions) {
        if (config) {
            this.client = new DataSource(config)
            return
        }

        this.client = new DataSource(connectionData as DataSourceOptions)
    }

    async initializeConnection() {
        await this.client.initialize()
        return this
    }

    // DONE: вынести создание таблицы в миграции которые выполняются каждый раз при старте проекта (up и down)

    async insertNewUser(login: string, password: string): Promise<void> {
        await this.client.query(`insert into users (login, password) values (${login}, ${password})`)
    }

    // DONE: реализовать кеширование запросов для получения пользователя с базы на 10 секунд в отдельном сервисе кеширования Redis (подсказка: хеш запроса в качестве ключа)
    async getUser(login: string, password: string, redisService: RedisService): Promise<UserTable | undefined> {
        try {
            const query = `select * from users where login = ${login} and password = ${password}`
            const queryHash = md5(query)

            const redisData = await redisService.getData(queryHash)

            if (redisData === undefined) {
                console.log('not exist ')
                const result = await this.client.query<Array<UserTable>>(query)
                redisService.setData<UserTable>(result[0], queryHash, 10)

                return result[0]
            } else {
                console.log(' exist ')
                return JSON.parse(redisData)
            }
        } catch (error) {
            return undefined
        }
    }
}

// TODO: уровни транзакций
// Objection.JS или TypeORM - выбор за тобою
