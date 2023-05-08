import cookieParser from 'cookie-parser'
import express from 'express'
import { DatabaseService } from 'services/db-client/db-client.service'
import setAuthRoute from './routes/auth.route'
import setNameRoute from './routes/name.route'
import setRedirectRoute from './routes/redirect.route'
import setSaveFileRoute from './routes/save-file.route'
import setUnAuthRoute from './routes/un-auth.route'

export class ServerService {
    private app: express.Application
    private databaseService: DatabaseService

    constructor(databaseService: DatabaseService) {
        this.app = express()
        this.databaseService = databaseService
    }

    async initializeServer(port: number = 4000) {
        this.app.use(express.json())
        this.app.use(cookieParser())

        setAuthRoute(this.app, this.databaseService)
        setUnAuthRoute(this.app)
        setRedirectRoute(this.app)
        setSaveFileRoute(this.app)
        setNameRoute(this.app)

        await this.app.listen(port, () => console.log('Server started.'))
    }
}
