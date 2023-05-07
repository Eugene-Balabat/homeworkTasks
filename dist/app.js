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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const dotenv = __importStar(require("dotenv"));
const postgres_1 = __importDefault(require("postgres"));
dotenv.config();
const secretKey = process.env.SECRET_KEY;
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const sql = (0, postgres_1.default)({
    host: process.env.DB_HOST,
    port: new Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD, // Password of database user
});
//const sql = postgres('postgres://user:@localhost:5432/database')
const responseData200 = { message: 'Ok' };
const responseData400 = { message: 'Error: Bad Request' };
const responseData401 = { message: 'Error: Unauthorized' };
function isUperCaseCharacter(str, expression) {
    if (expression.test(str)) {
        return true;
    }
    return false;
}
function createNewTableUsers(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sql `create table ${sql(name)} (id SERIAL PRIMARY KEY, login varchar(50), password varchar(50))`;
        }
        catch (err) {
            console.log(err);
        }
    });
}
function addNewUser(login, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sql `insert into users (login, password) values (${login}, ${password})`;
        }
        catch (err) {
            console.log(err);
        }
    });
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
            return res.status(401).json(Object.assign({}, responseData401));
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
app.post('/saveFile', upload.single('image'), authMiddleware, (req, res) => {
    const { file } = req;
    if (file) {
        res.status(200).json({ fileSize: file.size });
    }
    else
        res.status(400).json(Object.assign({}, responseData400));
});
app.post('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    if (login && password) {
        const users = (yield sql `select * from users where login = ${login} and password = ${password}`);
        if (users.length) {
            const token = jsonwebtoken_1.default.sign({ userId: users[0].id, userLogin: users[0].login }, secretKey, { expiresIn: '1h' });
            res.cookie('jwtToken', token, { httpOnly: true })
                .status(200)
                .json(Object.assign({}, responseData200));
        }
        else
            res.status(400).json(Object.assign({}, responseData400));
    }
    else
        res.status(400).json(Object.assign({}, responseData400));
}));
app.post('/unAuth', authMiddleware, (req, res) => {
    res.clearCookie('jwtToken')
        .status(200)
        .json(Object.assign({}, responseData200));
});
app.listen(port, () => {
    // const exp = /^[A-Z\s]+$/
    // const exp2 = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+$/
    // console.log(exp2.test('EMAILle@mail.ru'))
    //createNewTableUsers('users')
    //addNewUser('user', 'user')
    console.log(`Example app listening on port ${port}`);
});
