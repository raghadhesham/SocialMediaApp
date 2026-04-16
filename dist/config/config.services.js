"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
const NODE_ENV = process.env.NODE_ENV; //development or production;
dotenv_1.default.config({ path: (0, path_1.resolve)('./.env.' + NODE_ENV) });
// export const ACCESS_TOKEN_KEY: string=process.env.
exports.config = {
    PORT: Number(process.env.PORT),
    db: {
        MONGODB_URI: process.env.MONGODB_URI
    },
    jwt: {
        ACCESS_KEY: process.env.ACCESS_KEY,
        REFRESH_KEY: process.env.REFRESH_KEY,
        ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
        REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    },
    email: {
        EMAIL: process.env.EMAIL,
        PASSWORD: process.env.PASSWORD
    }
};
//# sourceMappingURL=config.services.js.map