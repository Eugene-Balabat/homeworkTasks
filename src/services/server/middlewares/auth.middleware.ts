import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { TokenData } from 'old/interface'

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const { jwtToken } = req.cookies

    if (jwtToken) {
        try {
            const { userId, userLogin } = jwt.verify(jwtToken, process.env.SECRET_KEY as string) as TokenData

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
