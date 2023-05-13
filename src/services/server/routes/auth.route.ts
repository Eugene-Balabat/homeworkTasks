import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { DatabaseService } from 'services/db-client/db-client.service'
import { RedisService } from '../../redis/redis.service'

export function setAuthRoute(app: express.Application, databaseService: DatabaseService, redisService: RedisService) {
    async function route(req: Request, res: Response) {
        const { login, password } = req.body

        if (login && password) {
            const result = await databaseService.getUser(login, password, redisService)

            if (result) {
                const token = jwt.sign({ userId: result.id, userLogin: result.login }, process.env.SECRET_KEY as string, { expiresIn: '1h' })

                res.cookie('jwtToken', token, { httpOnly: true }).status(200).send()
            } else {
                res.status(400).json()
            }
        } else {
            res.status(400).send()
        }
    }

    app.post('/auth', route)
}
