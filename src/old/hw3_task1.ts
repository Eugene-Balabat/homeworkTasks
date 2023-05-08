import { ResolvedData } from './interface'

const funcs: Array<Function> = [
    (): Promise<ResolvedData> =>
        new Promise((resolve) => {
            const data: ResolvedData = { message: 'alles gut' }
            console.log(new Date())
            resolve(data)
        }),
    (): Promise<ResolvedData> =>
        new Promise((resolve) => {
            const data: ResolvedData = { message: 'alles gut' }
            console.log(new Date())
            resolve(data)
        }),
    (): Promise<ResolvedData> =>
        new Promise((resolve) => {
            const data: ResolvedData = { message: 'alles gut' }
            console.log(new Date())
            resolve(data)
        }),
    (): Promise<ResolvedData> =>
        new Promise((resolve) => {
            const data: ResolvedData = { message: 'alles gut' }
            console.log(new Date())
            resolve(data)
        }),
    (): Promise<ResolvedData> =>
        new Promise((resolve) => {
            const data: ResolvedData = { message: 'alles gut' }
            console.log(new Date())
            resolve(data)
        }),
    (): Promise<ResolvedData> =>
        new Promise((resolve) => {
            const data: ResolvedData = { message: 'alles gut' }
            console.log(new Date())
            resolve(data)
        }),
]

async function mainFunc(
    funcsPromises: Array<Function>,
    tasksPerSec: number,
    seconds: number
): Promise<Array<ResolvedData>> {
    return new Promise((resolve) => {
        const resultG: Array<ResolvedData> = []
        const interval = setInterval(async () => {
            const resultL = await Promise.all(
                funcsPromises.splice(0, tasksPerSec).map((func) => func())
            )
            resultG.push(...resultL)

            if (!funcsPromises.length) {
                clearInterval(interval)
                resolve(resultG)
            }
        }, seconds * 1000)
    })
}

mainFunc(funcs, 2, 1).then(console.log)
