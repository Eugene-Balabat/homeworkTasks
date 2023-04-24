import { ResolvedData } from './interface'

const funcs: Array<Function> = [
    (): Promise<ResolvedData> =>
        new Promise((resolve) => {
            const data: ResolvedData = { message: 'alles gut' }
            resolve(data)
        }),
    (): Promise<ResolvedData> =>
        new Promise((resolve) => {
            const data: ResolvedData = { message: 'alles gut' }
            resolve(data)
        }),
    (): Promise<ResolvedData> =>
        new Promise((resolve) => {
            const data: ResolvedData = { message: 'alles gut' }
            resolve(data)
        }),
    (): Promise<ResolvedData> =>
        new Promise((resolve) => {
            const data: ResolvedData = { message: 'alles gut' }
            resolve(data)
        }),
    (): Promise<ResolvedData> =>
        new Promise((resolve) => {
            const data: ResolvedData = { message: 'alles gut' }
            resolve(data)
        }),
    (): Promise<ResolvedData> =>
        new Promise((resolve) => {
            const data: ResolvedData = { message: 'alles gut' }
            resolve(data)
        }),
]

function mainFunc(
    funcsPromises: Array<Function>,
    tasksPerSec: number,
    seconds: number
): void {
    const resultArr: Array<ResolvedData> = []
    const arrPromises: Array<Promise<ResolvedData>> = []

    funcsPromises.forEach((func) => {
        arrPromises.push(func())
    })

    const interval = setInterval(() => {
        Promise.all(arrPromises.splice(0, tasksPerSec)).then((results) => {
            results.forEach((element) => {
                resultArr.push(element)
                console.log(`${element.message} ${new Date()}`)
            })

            if (!arrPromises.length) clearInterval(interval)
        })
    }, seconds * 1000)
}

mainFunc(funcs, 2, 5)
