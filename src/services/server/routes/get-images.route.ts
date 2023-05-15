import express, { Request, Response } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { DatabaseService } from 'services/db-client/db-client.service'

export default function setRoute(app: express.Application, databaseService: DatabaseService) {
    async function route(req: Request, res: Response) {
        try {
            const { userId } = req.body

            if (userId) {
                const result = await (await databaseService.getAllUserImages(Number(userId))).map((element) => element.title)

                result ? res.status(200).send(result) : res.status(400).send()
            } else {
                res.status(400).send()
            }
        } catch (error) {
            res.status(400).send({ error })
        }
    }

    app.post('/get-images', authMiddleware, route)
}
