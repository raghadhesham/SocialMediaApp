"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const user_repository_1 = __importDefault(require("../../DB/repository/user.repository"));
const bcrypt_1 = require("bcrypt");
const send_email_1 = require("../../common/utils/email/send.email");
const config_services_1 = require("../../config/config.services");
const email_template_1 = require("../../common/utils/email/email.template");
const redis_services_1 = __importDefault(require("../../common/services/redis.services"));
const global_error_handler_1 = require("../../common/utils/response/global-error-handler");
class AuthService {
    _userRepo = new user_repository_1.default(user_model_1.default);
    constructor() { }
    signup = async (req, res, next) => {
        let { firstName, lastName, email, password, confirmPassword, gender, DOB, profilePicture, coverPicture, } = req.body;
        const hashed = await (0, bcrypt_1.hash)(password, 12);
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }
        const user = await this._userRepo.create({
            firstName,
            lastName,
            email,
            password: hashed,
            gender,
            DOB,
            profilePicture,
            coverPicture,
        });
        res.status(201).json({
            message: "User created successfully",
            data: {
                firstName,
                lastName,
                email,
                password: hashed,
                gender,
                DOB,
            },
        });
    };
    signin = async (req, res, next) => {
        const { email, password } = req.body;
        res.status(200).json({
            message: "User signed in successfully",
            data: {
                email,
                password,
            },
        });
    };
    sendOTP = async (email, subject) => {
        const OTP = (await (0, send_email_1.generateOTP)());
        await (0, send_email_1.sendEmail)({
            from: config_services_1.config.email.EMAIL,
            to: email,
            subject: "Hi! this is nodemailer working",
            html: (0, email_template_1.emailTemplate)(OTP),
        });
        await redis_services_1.default.setRedisValue({
            key: redis_services_1.default.otp_key(email, subject),
            value: OTP,
            ttl: 5 * 60,
        });
    };
    verifyOTP = async (email, gotOTP, subject) => {
        if (!gotOTP) {
            throw new global_error_handler_1.AppError("No OTP Provided", 400);
        }
        const OTPExists = await redis_services_1.default.getRedisValue(redis_services_1.default.otp_key(email, subject));
        if (!OTPExists) {
            throw new global_error_handler_1.AppError("OTP Expired", 400);
        }
        if (!(await (0, bcrypt_1.compare)(gotOTP, OTPExists))) {
            throw new global_error_handler_1.AppError("OTPs don't match", 400);
        }
    };
    confirmEmail = async (req, res, next) => {
        const { gotOTP, email, subject } = req.body;
        this.verifyOTP(email, gotOTP, subject);
        await this._userRepo.updateOne({
            filter: { email, confirmed: false },
            update: { confirmed: true },
            options: null,
        });
        await redis_services_1.default.deleteRedisValue(redis_services_1.default.otp_key(email, "confirmEmail"));
        return res.json({ res, message: `confirmed` });
    };
    // dah lesa msh kamel
    resendOTP = async (req, res, next) => {
        const { email } = req.body;
        const user = await this._userRepo.findOne({
            filter: { email, isConfirmed: false },
        });
        if (!user) {
            throw new global_error_handler_1.AppError("User doesn't exist or already confirmed", 400);
        }
    };
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.services.js.map