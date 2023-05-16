import express, { Request, Response } from 'express'
import fs from 'fs'
import multer from 'multer'
import { DatabaseService } from 'services/db-client/db-client.service'
import { authMiddleware } from '../middlewares/auth.middleware'

export default function setRoute(app: express.Application, databaseService: DatabaseService) {
    async function route(req: Request, res: Response) {
        try {
            const { file } = req
            const { user_id } = req.query
            console.log(file)
            if (!fs.existsSync('uploads')) {
                fs.mkdirSync('uploads', { recursive: true })
            }

            console.log(user_id)
            if (file && user_id) {
                await fs.writeFileSync(`${file.originalname}`, file.buffer, { flag: 'ax' })

                await databaseService.insertNewUserImage(file.originalname, Number(user_id))
                res.status(200).json({ fileSize: file.size })
            } else {
                res.status(400).send()
            }
        } catch (error) {
            res.status(400).send({ error })
        }
    }

    app.post('/save-file', authMiddleware, multer().single('image'), route)
}
