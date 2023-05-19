import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { jwtToken } = req.cookies

    if (jwtToken) {
        try {
            const { userId, userLogin } = (await jwt.verify(jwtToken, process.env.SECRET_KEY as string)) as { userId: number; userLogin: string }

            req.userId = userId
            req.userLogin = userLogin

            return next()
        } catch {
            res.status(401).send()
        }
    } else {
        res.status(400).send()
    }
}
