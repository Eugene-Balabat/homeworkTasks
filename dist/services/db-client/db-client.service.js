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
exports.DatabaseService = void 0;
const dotenv = __importStar(require("dotenv"));
const pg_1 = __importDefault(require("pg"));
class DatabaseService {
    constructor(config) {
        if (config) {
            this.client = new pg_1.default.Client(config);
            return;
        }
        dotenv.config();
        this.client = new pg_1.default.Client({
            // Postgres ip address[s] or domain name[s]
            host: String(process.env.DB_HOST),
            // Postgres port
            port: Number(process.env.DB_PORT),
            // Name of database to connect to
            database: String(process.env.DB_NAME),
            // Username of database user
            user: String(process.env.DB_USERNAME),
            // Password of database user
            password: String(process.env.DB_PASSWORD),
        });
    }
    initializeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
            return this;
        });
    }
    createNewTableUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.query(`create table if not exist users (id SERIAL PRIMARY KEY, login varchar(50), password varchar(50))`);
        });
    }
    insertNewUser(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.query(`insert into users (login, password) values (${login}, ${password})`);
        });
    }
    getUser(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.query(`select * from users where login = ${login} and password = ${password}`);
            return result.rowCount > 0 ? result.rows[0] : undefined;
        });
    }
}
exports.DatabaseService = DatabaseService;
