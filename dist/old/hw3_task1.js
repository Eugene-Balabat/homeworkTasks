"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const funcs = [
    () => new Promise((resolve) => {
        const data = { message: 'alles gut' };
        console.log(new Date());
        resolve(data);
    }),
    () => new Promise((resolve) => {
        const data = { message: 'alles gut' };
        console.log(new Date());
        resolve(data);
    }),
    () => new Promise((resolve) => {
        const data = { message: 'alles gut' };
        console.log(new Date());
        resolve(data);
    }),
    () => new Promise((resolve) => {
        const data = { message: 'alles gut' };
        console.log(new Date());
        resolve(data);
    }),
    () => new Promise((resolve) => {
        const data = { message: 'alles gut' };
        console.log(new Date());
        resolve(data);
    }),
    () => new Promise((resolve) => {
        const data = { message: 'alles gut' };
        console.log(new Date());
        resolve(data);
    }),
];
function mainFunc(funcsPromises, tasksPerSec, seconds) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            const resultG = [];
            const interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                const resultL = yield Promise.all(funcsPromises.splice(0, tasksPerSec).map((func) => func()));
                resultG.push(...resultL);
                if (!funcsPromises.length) {
                    clearInterval(interval);
                    resolve(resultG);
                }
            }), seconds * 1000);
        });
    });
}
mainFunc(funcs, 2, 1).then(console.log);
