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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTokenFromHeaders = exports.createTokenPayload = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const node_crypto_1 = require("node:crypto");
const jwt = __importStar(require("jsonwebtoken"));
const config_services_1 = require("../../../config/config.services");
const global_error_handler_1 = require("../response/global-error-handler");
const generateAccessToken = (payload) => {
    const jwtId = (0, node_crypto_1.randomUUID)();
    return jwt.sign(payload, config_services_1.config.jwt.ACCESS_KEY, {
        expiresIn: config_services_1.config.jwt.ACCESS_TOKEN_EXPIRES_IN,
        jwtid: jwtId,
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    const jwtId = (0, node_crypto_1.randomUUID)();
    return jwt.sign(payload, config_services_1.config.jwt.REFRESH_KEY, {
        expiresIn: Number(config_services_1.config.jwt.REFRESH_TOKEN_EXPIRES_IN),
        jwtid: jwtId,
    });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, config_services_1.config.jwt.ACCESS_KEY);
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new global_error_handler_1.AppError("Token has Expired", 401);
        }
        if (error.name === "JsonWebTokenError") {
            throw new global_error_handler_1.AppError("Token is invalid", 401);
        }
        throw new global_error_handler_1.AppError("Token verification FAILED", 401);
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, config_services_1.config.jwt.REFRESH_KEY);
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new global_error_handler_1.AppError("Token has Expired", 401);
        }
        if (error.name === "JsonWebTokenError") {
            throw new global_error_handler_1.AppError("Token is invalid", 401);
        }
        throw new global_error_handler_1.AppError("Token verification FAILED", 401);
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
const createTokenPayload = (user) => {
    return {
        _id: user._id,
        email: user.email,
        role: user.role,
        // user:signupre
    };
};
exports.createTokenPayload = createTokenPayload;
const extractTokenFromHeaders = (authHeaders) => {
    if (!authHeaders) {
        throw new global_error_handler_1.AppError("No Token provided", 401);
    }
    if (!authHeaders.startsWith("bearer ")) {
        throw new global_error_handler_1.AppError("Invalid Prefix", 401);
    }
    return authHeaders.split(" ")[1];
};
exports.extractTokenFromHeaders = extractTokenFromHeaders;
//# sourceMappingURL=token.js.map