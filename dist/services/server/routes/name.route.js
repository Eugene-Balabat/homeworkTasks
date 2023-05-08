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
const auth_middleware_1 = require("../middlewares/auth.middleware");
function setRoute(app) {
    function isUperCaseCharacter(str, expression) {
        if (expression.test(str)) {
            return true;
        }
        return false;
    }
    function route(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: используя дженерик расширить тип Request что бы body в нёр был типа RequestData
            const personalData = req.body;
            if (isUperCaseCharacter(personalData.firstName, /[A-Z]/)) {
                res.status(200).send();
            }
            else {
                res.status(400).send();
            }
        });
    }
    app.get('/name', auth_middleware_1.authMiddleware, route);
}
exports.default = setRoute;
