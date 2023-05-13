import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

dotenv.config()

export const connectionData: DataSourceOptions = {
    type: 'postgres',
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_NAME),
    migrations: ['dist/migrations/**/*{.ts,.js}'],
    entities: ['/dist/models/**/*{.ts,.js}'],
    synchronize: false,
    cache: { duration: 1 },
}

export default new DataSource(connectionData)
