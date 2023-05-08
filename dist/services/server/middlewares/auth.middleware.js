"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// TODO: расширить интерфейс Request на глобально уровне используя деларацию типов .d.ts
function authMiddleware(req, res, next) {
    const { jwtToken } = req.cookies;
    if (jwtToken) {
        try {
            const { userId, userLogin } = jsonwebtoken_1.default.verify(jwtToken, process.env.SECRET_KEY);
            // req.userId = userId
            // req.userLogin = userLogin
            return next();
        }
        catch (_a) {
            res.status(401).send();
        }
    }
    else {
        res.status(400).send();
    }
}
exports.authMiddleware = authMiddleware;
