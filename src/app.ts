import './models/user.model'
import { DatabaseService } from './services/db-client/db-client.service'
import { RedisService } from './services/redis/redis.service'
import { ServerService } from './services/server/server.service'

async function bootstrap() {
    const databaseService = await new DatabaseService().initializeConnection()
    const redisService = await new RedisService().initializeService()
    const application = await new ServerService(databaseService, redisService).initializeServer()
}

bootstrap()
