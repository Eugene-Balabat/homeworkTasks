"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 4000;
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.redirect(301, 'https://www.google.com/');
});
app.post('/name', (req, res) => {
    const personalData = req.body;
    const responseData200 = { message: 'Ok' };
    const responseData400 = { message: 'Error: Bad Request' };
    if (personalData.firstName[0].toUpperCase() === personalData.firstName[0])
        res.status(200).json(Object.assign({}, responseData200));
    else
        res.status(400).json(Object.assign({}, responseData400));
});
// Do not understend, how shoud i using only RequestData type as body params. Client can send us any data. How can i say,
// that i use only RequestData, anotherway will be Error. Now client can send propertie lastName as number.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
