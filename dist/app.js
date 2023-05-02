"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const lodash_1 = __importDefault(require("lodash"));
const DB_1 = __importDefault(require("./DB"));
dotenv.config();
const secretKey = process.env.SECRET_KEY;
const responseData200 = { message: 'Ok' };
const responseData400 = { message: 'Error: Bad Request' };
const responseData401 = { message: 'Unauthorized' };
function isUperCaseCharacter(str, expression) {
    if (expression.test(str)) {
        return true;
    }
    return false;
}
function authMiddleware(req, res, next) {
    const { jwtToken } = req.cookies;
    if (jwtToken) {
        try {
            const { userId, userLogin } = jsonwebtoken_1.default.verify(jwtToken, secretKey);
            req.userId = userId;
            req.userLogin = userLogin;
            return next();
        }
        catch (_a) {
            return res.status(403).json(Object.assign({}, responseData401));
        }
    }
    else
        return res.status(400).json(Object.assign({}, responseData400));
}
const app = (0, express_1.default)();
const port = 4000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/', (_req, res) => {
    res.redirect(301, 'https://www.google.com/');
});
app.post('/name', (req, res) => {
    const personalData = req.body;
    if (isUperCaseCharacter(personalData.firstName, /[A-Z]/))
        res.status(200).json(Object.assign({}, responseData200));
    else
        res.status(400).json(Object.assign({}, responseData400));
});
app.post('/auth', (req, res) => {
    const { login, password } = req.body;
    const user = lodash_1.default.find(DB_1.default.users, { login, password });
    if (login && password) {
        if (user) {
            const token = jsonwebtoken_1.default.sign({ userId: user.id, userLogin: user.login }, secretKey, { expiresIn: '1h' });
            res.cookie('jwtToken', token, { httpOnly: true })
                .status(200)
                .json(Object.assign({}, responseData200));
        }
        else
            res.status(400).json(Object.assign({}, responseData400));
    }
    else
        res.status(400).json(Object.assign({}, responseData400));
});
app.post('/unAuth', authMiddleware, (req, res) => {
    res.clearCookie('jwtToken')
        .status(200)
        .json(Object.assign({}, responseData200));
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
