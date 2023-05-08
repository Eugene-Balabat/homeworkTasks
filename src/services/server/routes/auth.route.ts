import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { DatabaseService } from 'services/db-client/db-client.service'
import { authMiddleware } from '../middlewares/auth.middleware'

export default function setRoute(app: express.Application, databaseService: DatabaseService) {
    async function route(req: Request, res: Response) {
        const { login, password } = req.body

        if (login && password) {
            const user = await databaseService.getUser(login, password)

            if (user) {
                const token = jwt.sign({ userId: user.id, userLogin: user.login }, process.env.SECRET_KEY as string, { expiresIn: '1h' })
                res.cookie('jwtToken', token, { httpOnly: true }).status(200).send()
            } else {
                res.status(400).json()
            }
        } else {
            res.status(400).send()
        }
    }

    app.get('/auth', authMiddleware, route)
}
