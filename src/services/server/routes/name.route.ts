import express, { Request, Response } from 'express'
import { RequestData } from 'old/interface'
import { authMiddleware } from '../middlewares/auth.middleware'

export default function setRoute(app: express.Application) {
    function isUperCaseCharacter(str: string, expression: RegExp): boolean {
        if (expression.test(str)) {
            return true
        }
        return false
    }

    async function route(req: Request, res: Response) {
        // TODO: используя дженерик расширить тип Request что бы body в нёр был типа RequestData
        const personalData: RequestData = req.body

        if (isUperCaseCharacter(personalData.firstName, /[A-Z]/)) {
            res.status(200).send()
        } else {
            res.status(400).send()
        }
    }

    app.get('/name', authMiddleware, route)
}
