import express, { Request, Response } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'

export default function setRoute(app: express.Application) {
    async function route(req: Request, res: Response) {
        res.clearCookie('jwtToken').status(200).send()
    }

    app.get('/un-auth', authMiddleware, route)
}
