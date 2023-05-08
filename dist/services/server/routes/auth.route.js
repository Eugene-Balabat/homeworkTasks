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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
function setRoute(app, databaseService) {
    function route(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { login, password } = req.body;
            if (login && password) {
                const user = yield databaseService.getUser(login, password);
                if (user) {
                    const token = jsonwebtoken_1.default.sign({ userId: user.id, userLogin: user.login }, process.env.SECRET_KEY, { expiresIn: '1h' });
                    res.cookie('jwtToken', token, { httpOnly: true }).status(200).send();
                }
                else {
                    res.status(400).json();
                }
            }
            else {
                res.status(400).send();
            }
        });
    }
    app.get('/auth', auth_middleware_1.authMiddleware, route);
}
exports.default = setRoute;
