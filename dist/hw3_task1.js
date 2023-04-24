"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const funcs = [
    () => new Promise((resolve) => {
        const data = { message: 'alles gut' };
        resolve(data);
    }),
    () => new Promise((resolve) => {
        const data = { message: 'alles gut' };
        resolve(data);
    }),
    () => new Promise((resolve) => {
        const data = { message: 'alles gut' };
        resolve(data);
    }),
    () => new Promise((resolve) => {
        const data = { message: 'alles gut' };
        resolve(data);
    }),
    () => new Promise((resolve) => {
        const data = { message: 'alles gut' };
        resolve(data);
    }),
    () => new Promise((resolve) => {
        const data = { message: 'alles gut' };
        resolve(data);
    }),
];
function mainFunc(funcsPromises, tasksPerSec, seconds) {
    const resultArr = [];
    const arrPromises = [];
    funcsPromises.forEach((func) => {
        arrPromises.push(func());
    });
    const interval = setInterval(() => {
        Promise.all(arrPromises.splice(0, tasksPerSec)).then((results) => {
            results.forEach((element) => {
                resultArr.push(element);
                console.log(`${element.message} ${new Date()}`);
            });
            if (!arrPromises.length)
                clearInterval(interval);
        });
    }, seconds * 1000);
}
mainFunc(funcs, 2, 5);
