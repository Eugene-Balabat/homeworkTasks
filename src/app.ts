import express from 'express'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import * as dotenv from 'dotenv'
import _ from 'lodash'
import postgres from 'postgres'

import DB from './DB'
import { RequestData, ResolvedData, TokenData, UserData } from './interface'

dotenv.config()

const secretKey = process.env.SECRET_KEY
const upload = multer({ dest: 'uploads/' })
const sql = postgres({
    host: process.env.DB_HOST as string, // Postgres ip address[s] or domain name[s]
    port: new Number(process.env.DB_PORT) as number,
    database: process.env.DB_NAME as string, // Name of database to connect to
    username: process.env.DB_USERNAME as string, // Username of database user
    password: process.env.DB_PASSWORD as string, // Password of database user
})

//const sql = postgres('postgres://user:@localhost:5432/database')

const responseData200: ResolvedData = { message: 'Ok' }
const responseData400: ResolvedData = { message: 'Error: Bad Request' }
const responseData401: ResolvedData = { message: 'Error: Unauthorized' }

function isUperCaseCharacter(str: string, expression: RegExp): boolean {
    if (expression.test(str)) {
        return true
    }
    return false
}

async function createNewTableUsers(name: string): Promise<void> {
    try {
        await sql`create table ${sql(
            name
        )} (id SERIAL PRIMARY KEY, login varchar(50), password varchar(50))`
    } catch (err) {
        console.log(err)
    }
}

async function addNewUser(login: string, password: string): Promise<void> {
    try {
        await sql`insert into users (login, password) values (${login}, ${password})`
    } catch (err) {
        console.log(err)
    }
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
            return res.status(401).json({ ...responseData401 })
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

app.post('/saveFile', upload.single('image'), authMiddleware, (req, res) => {
    const { file } = req

    if (file) {
        res.status(200).json({ fileSize: file.size })
    } else res.status(400).json({ ...responseData400 })
})

app.post('/auth', async (req, res) => {
    const { login, password } = req.body

    if (login && password) {
        const users =
            (await sql`select * from users where login = ${login} and password = ${password}`) as UserData[]
        if (users.length) {
            const token = jwt.sign(
                { userId: users[0].id, userLogin: users[0].login },
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
    // const exp = /^[A-Z\s]+$/
    // const exp2 = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+$/
    // console.log(exp2.test('EMAILle@mail.ru'))

    //createNewTableUsers('users')
    //addNewUser('user', 'user')

    console.log(`Example app listening on port ${port}`)
})
