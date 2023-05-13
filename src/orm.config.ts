import { DataSource, DataSourceOptions } from 'typeorm'

import * as dotenv from 'dotenv'

dotenv.config()

export const connectionData = {
    type: 'postgres',
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_NAME),
    migrations: ['dist/migrations/**/*{.ts,.js}'],
}

export default new DataSource(connectionData as DataSourceOptions)
