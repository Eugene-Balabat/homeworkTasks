import express, { Request, Response } from 'express'
import multer from 'multer'
import { authMiddleware } from '../middlewares/auth.middleware'

export default function setRoute(app: express.Application) {
    async function route(req: Request, res: Response) {
        const { file } = req

        if (file) {
            res.status(200).json({ fileSize: file.size })
        } else {
            res.status(400).send()
        }
    }

    app.post('/save-file', authMiddleware, multer({ dest: 'uploads/' }).single('image'), route)
}
