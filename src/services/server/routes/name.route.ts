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

    interface modifedRequest extends Request {
        body: RequestData
    }

    //async function route<T extends { body: RequestData }>(req: T, res: Response) {
    async function route(req: modifedRequest, res: Response) {
        // DONE: используя дженерик расширить тип Request что бы body в нёр был типа RequestData
        const personalData = req.body

        console.log(personalData)
        if (isUperCaseCharacter(personalData.firstName, /[A-Z]/)) {
            res.status(200).send()
        } else {
            res.status(400).send()
        }

        res.status(400).send()
    }

    app.post('/name', authMiddleware, route)
}
