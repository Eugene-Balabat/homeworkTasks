import { DatabaseService } from './services/db-client/db-client.service'
import { ServerService } from './services/server/server.service'

async function bootstrap() {
    const databaseService = await new DatabaseService().initializeConnection()
    const application = await new ServerService(databaseService).initializeServer()
}

bootstrap()
