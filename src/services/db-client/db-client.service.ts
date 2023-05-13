import { RedisService } from 'services/redis/redis.service'
import { DataSource } from 'typeorm'
import { User } from '../../models/user.model'
import dataSource from '../../orm.config'

export class DatabaseService {
    private client: DataSource

    constructor(source: DataSource = dataSource) {
        this.client = source
    }

    async initializeConnection() {
        await this.client.initialize()
        return this
    }

    async insertNewUser(login: string, password: string): Promise<void> {
        await this.client.query(`insert into users (login, password) values (${login}, ${password})`)
    }

    async getUser(login: string, password: string, redisService: RedisService): Promise<User | null> {
        // TODO: посмотреть варианты запросов и фильтраций для typeorm и обязательно для (связанных таблиц)
        return this.client.getRepository(User).findOne({ where: { login, password }, select: ['id', 'login'] })
    }
}
