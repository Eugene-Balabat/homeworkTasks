import express, { Request, Response } from 'express'
import multer from 'multer'
import { authMiddleware } from '../middlewares/auth.middleware'
import { DatabaseService } from 'services/db-client/db-client.service'

export default function setRoute(app: express.Application, databaseService: DatabaseService) {
    async function route(req: Request, res: Response) {
        try {
            const { file } = req
            const { user_id } = req.query

            if (file && user_id) {
                await databaseService.insertNewUserImage(file.filename, Number(user_id))
                res.status(200).json({ fileSize: file.size })
            } else {
                res.status(400).send()
            }
        } catch (error) {
            res.status(400).send({ error })
        }
    }

    app.post('/save-file', authMiddleware, multer({ dest: 'uploads/' }).single('image'), route)
}
