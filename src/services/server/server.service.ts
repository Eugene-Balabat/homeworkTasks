import cookieParser from 'cookie-parser'
import express from 'express'
import { DatabaseService } from 'services/db-client/db-client.service'
import { setAuthRoute } from './routes/auth.route'
import setNameRoute from './routes/name.route'
import setRedirectRoute from './routes/redirect.route'
import setSaveFileRoute from './routes/save-file.route'
import setUnAuthRoute from './routes/un-auth.route'
import setGetImagesRoute from './routes/get-images.route'
import { RedisService } from 'services/redis/redis.service'

export class ServerService {
    private app: express.Application
    private databaseService: DatabaseService
    private redisService: RedisService

    constructor(databaseService: DatabaseService, redisService: RedisService) {
        this.app = express()
        this.databaseService = databaseService
        this.redisService = redisService
    }

    async initializeServer(port: number = 4000) {
        this.app.use(express.json())
        this.app.use(cookieParser())

        setAuthRoute(this.app, this.databaseService, this.redisService)
        setUnAuthRoute(this.app)
        setRedirectRoute(this.app)
        setSaveFileRoute(this.app, this.databaseService)
        setNameRoute(this.app)
        setGetImagesRoute(this.app, this.databaseService)

        //this.databaseService.insertNewUser('user', 'user')

        await this.app.listen(port, () => console.log('Server started.'))
    }
}
