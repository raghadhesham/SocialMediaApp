"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const token_1 = require("../utils/auth/token");
const user_model_1 = __importDefault(require("../../models/user.model"));
const user_repository_1 = __importDefault(require("../../DB/repository/user.repository"));
const authenticate = async (req, res, next) => {
    const token = (0, token_1.extractTokenFromHeaders)(req.headers.authorization);
    const decoded = (0, token_1.verifyAccessToken)(token);
    // verifyAccessToken can return a raw string if the token was signed with a plain string payload (not an object)
    req.userId = decoded._id;
    req.userEmail = decoded.email;
    req.role = decoded.role;
    req.user = decoded;
    next();
    const userRepository = new user_repository_1.default(user_model_1.default);
    // const user = await userRepository.findById(req.userId);
    // if (!user) {
    //     throw new Error("user doesn't exist");
    //   }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authentication.js.map