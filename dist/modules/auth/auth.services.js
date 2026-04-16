"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user.model"));
const user_repository_1 = __importDefault(require("../../DB/repository/user.repository"));
const bcrypt_1 = require("bcrypt");
class AuthService {
    _userModel = new user_repository_1.default(user_model_1.default);
    constructor() { }
    signup = async (req, res, next) => {
        let { firstName, lastName, email, password, confirmPassword, gender, DOB, profilePicture, coverPicture } = req.body;
        const hashed = await (0, bcrypt_1.hash)(password, 12);
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }
        const user = await this._userModel.create({ firstName, lastName, email, password: hashed, gender, DOB, profilePicture, coverPicture });
        res.status(201).json({
            message: "User created successfully",
            data: {
                firstName,
                lastName,
                email,
                password: hashed,
                gender,
                DOB
            }
        });
    };
    signin = async (req, res, next) => {
        const { email, password } = req.body;
        res.status(200).json({
            message: "User signed in successfully",
            data: {
                email,
                password
            }
        });
    };
}
exports.default = new AuthService();
//# sourceMappingURL=auth.services.js.map