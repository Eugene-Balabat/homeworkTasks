import express, { Request, Response } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'

export default function setRoute(app: express.Application) {
    async function route(req: Request, res: Response) {
        res.redirect(301, 'https://www.google.com/')
    }

    app.get('/redirect', authMiddleware, route)
}
