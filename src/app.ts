import express from 'express'
import { type } from 'os'
import { RequestData, ResolvedData } from './interface'

function iskUperCaseCharacter(str: string): boolean {
    for (let i = 0; i < str.length; i += 1) {
        if (str[i].toUpperCase() === str[i]) {
            return true
        }
    }
    return false
}

const app = express()
const port = 4000

app.use(express.json())

app.get('/', (_req, res) => {
    res.redirect(301, 'https://www.google.com/')
})

app.post('/name', (req, res) => {
    const personalData: RequestData = req.body

    const responseData200: ResolvedData = { message: 'Ok' }
    const responseData400: ResolvedData = { message: 'Error: Bad Request' }

    if (iskUperCaseCharacter(personalData.firstName))
        res.status(200).json({ ...responseData200 })
    else res.status(400).json({ ...responseData400 })
})
// Do not understend, how shoud i using only RequestData type as body params. Client can send us any data. How can i say,
// that i use only RequestData, anotherway will be Error. Now client can send propertie lastName as number.

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
