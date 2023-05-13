import { RedisService } from './services/redis/redis.service'
import { DatabaseService } from './services/db-client/db-client.service'
import { ServerService } from './services/server/server.service'
import 'reflect-metadata'

async function bootstrap() {
    const databaseService = await new DatabaseService().initializeConnection()
    const redisService = await new RedisService().initializeService()
    const application = await new ServerService(databaseService, redisService).initializeServer()
}

bootstrap()
