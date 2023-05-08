import * as dotenv from 'dotenv'
import pg from 'pg'
import { DatabaseServiceConfig } from './db-client.interface'
import { UserTable } from './db-client.models'

export class DatabaseService {
    private client: pg.Client

    constructor(config?: DatabaseServiceConfig) {
        if (config) {
            this.client = new pg.Client(config)
            return
        }

        dotenv.config()

        this.client = new pg.Client({
            // Postgres ip address[s] or domain name[s]
            host: String(process.env.DB_HOST),
            // Postgres port
            port: Number(process.env.DB_PORT),
            // Name of database to connect to
            database: String(process.env.DB_NAME),
            // Username of database user
            user: String(process.env.DB_USERNAME),
            // Password of database user
            password: String(process.env.DB_PASSWORD),
        })
    }

    async initializeConnection() {
        await this.client.connect()
        return this
    }

    // TODO: вынести создание таблицы в миграции которые выполняются каждый раз при старте проекта (up и down)
    async createNewTableUsers(): Promise<void> {
        await this.client.query(`create table if not exist users (id SERIAL PRIMARY KEY, login varchar(50), password varchar(50))`)
    }

    async insertNewUser(login: string, password: string): Promise<void> {
        await this.client.query(`insert into users (login, password) values (${login}, ${password})`)
    }

    // TODO: реализовать кеширование запросов для получения пользователя с базы на 10 секунд в отдельном сервисе кеширования Redis (подсказка: хеш запроса в качестве ключа)
    async getUser(login: string, password: string): Promise<UserTable | undefined> {
        const result = await this.client.query<UserTable>(`select * from users where login = ${login} and password = ${password}`)
        return result.rowCount > 0 ? result.rows[0] : undefined
    }
}

// TODO: уровни транзакций
// Objection.JS или TypeORM - выбор за тобою
