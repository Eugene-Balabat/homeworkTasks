import express from 'express'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import * as dotenv from 'dotenv'
import _ from 'lodash'

import DB from './DB'
import { RequestData, ResolvedData, TokenData } from './interface'

dotenv.config()

const secretKey = process.env.SECRET_KEY

const responseData200: ResolvedData = { message: 'Ok' }
const responseData400: ResolvedData = { message: 'Error: Bad Request' }
const responseData401: ResolvedData = { message: 'Unauthorized' }

function isUperCaseCharacter(str: string, expression: RegExp): boolean {
    if (expression.test(str)) {
        return true
    }
    return false
}

function authMiddleware(req: any, res: any, next: any): void {
    const { jwtToken } = req.cookies
    if (jwtToken) {
        try {
            const { userId, userLogin } = jwt.verify(
                jwtToken,
                secretKey as jwt.Secret
            ) as TokenData

            req.userId = userId
            req.userLogin = userLogin
            return next()
        } catch {
            return res.status(403).json({ ...responseData401 })
        }
    } else return res.status(400).json({ ...responseData400 })
}

const app = express()
const port = 4000

app.use(express.json())
app.use(cookieParser())

app.get('/', (_req, res) => {
    res.redirect(301, 'https://www.google.com/')
})

app.post('/name', (req, res) => {
    const personalData: RequestData = req.body

    if (isUperCaseCharacter(personalData.firstName, /[A-Z]/))
        res.status(200).json({ ...responseData200 })
    else res.status(400).json({ ...responseData400 })
})

app.post('/auth', (req, res) => {
    const { login, password } = req.body
    const user = _.find(DB.users, { login, password })

    if (login && password) {
        if (user) {
            const token = jwt.sign(
                { userId: user.id, userLogin: user.login },
                secretKey as jwt.Secret,
                { expiresIn: '1h' }
            )
            res.cookie('jwtToken', token, { httpOnly: true })
                .status(200)
                .json({ ...responseData200 })
        } else res.status(400).json({ ...responseData400 })
    } else res.status(400).json({ ...responseData400 })
})

app.post('/unAuth', authMiddleware, (req, res) => {
    res.clearCookie('jwtToken')
        .status(200)
        .json({ ...responseData200 })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
