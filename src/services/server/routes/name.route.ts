import express, { Request, Response } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'

export default function setRoute(app: express.Application) {
    function isUperCaseCharacter(str: string, expression: RegExp): boolean {
        if (expression.test(str)) {
            return true
        }
        return false
    }

    async function route(req: Request<{}, { firstName: string; lastName: string }, { firstName: string; lastName: string }>, res: Response) {
        const personalData = req.body

        if (isUperCaseCharacter(personalData.firstName, /[A-Z]/)) {
            res.status(200).send()
        } else {
            res.status(400).send()
        }

        res.status(400).send()
    }

    app.post('/name', authMiddleware, route)
}
