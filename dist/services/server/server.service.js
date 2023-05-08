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
exports.ServerService = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const name_route_1 = __importDefault(require("./routes/name.route"));
const redirect_route_1 = __importDefault(require("./routes/redirect.route"));
const save_file_route_1 = __importDefault(require("./routes/save-file.route"));
const un_auth_route_1 = __importDefault(require("./routes/un-auth.route"));
class ServerService {
    constructor(databaseService) {
        this.app = (0, express_1.default)();
        this.databaseService = databaseService;
    }
    initializeServer(port = 4000) {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(express_1.default.json());
            this.app.use((0, cookie_parser_1.default)());
            (0, auth_route_1.default)(this.app, this.databaseService);
            (0, un_auth_route_1.default)(this.app);
            (0, redirect_route_1.default)(this.app);
            (0, save_file_route_1.default)(this.app);
            (0, name_route_1.default)(this.app);
            yield this.app.listen(port, () => console.log('Server started.'));
        });
    }
}
exports.ServerService = ServerService;
