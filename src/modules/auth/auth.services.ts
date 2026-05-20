import { NextFunction, Request, Response } from "express";
import { SignupRequest } from "../../auth.dto";
import UserModel from "../../models/user.model";
import { Model, QueryFilter } from "mongoose";
import UserRepository from "../../DB/repository/user.repository";
import { compare, hash } from "bcrypt";
import { generateOTP, sendEmail } from "../../common/utils/email/send.email";
import { config } from "../../config/config.services";
import { emailTemplate } from "../../common/utils/email/email.template";
import redisServices from "../../common/services/redis.services";
import { AppError } from "../../common/utils/response/global-error-handler";
import {
  createTokenPayload,
  extractTokenFromHeaders,
  generateAccessToken,
  generateRefreshToken, 
} from "../../common/utils/auth/token";
export class AuthService {
  private readonly _userRepo = new UserRepository(UserModel); 
  constructor() {}
  signup = async (req: Request, res: Response, next: NextFunction) => {
    let {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
      DOB,
      profilePicture,
      coverPicture,
    }: SignupRequest = req.body;
    const hashed: string = await hash(password, 12);
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
  signin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, fcm } = req.body; 
    const user = await this._userRepo.findOne({ filter: { email } });
    if (!user) {
      throw new AppError("Invalid credentials, wasn't found", 401);
    }
    const isMatch = await compare(password, user.password);
    console.log(user);
    
    if (!isMatch) {
      throw new AppError("Invalid credentials, doesn't match", 401);
    }
    const payload = createTokenPayload(user);
    const accessToken = generateAccessToken(payload as any);
    const refreshToken = generateRefreshToken(payload as any);
    if (fcm) {
      // await redisServices.addFCM(user._id, fcm)
    }
    res.status(200).json({
      message: "User signed in successfully",
      data: {
        accessToken,
        refreshToken,
      },
    });
  };

  sendOTP = async (email: string, subject: string) => {
    const OTP = (await generateOTP()) as unknown as string;
    await sendEmail({
      from: config.email.EMAIL!,
      to: email,
      subject: "Hi! this is nodemailer working",
      html: emailTemplate(OTP),
    });
    await redisServices.setRedisValue({
      key: redisServices.otp_key(email, subject),
      value: OTP,
      ttl: 5 * 60,
    });
  };
  verifyOTP = async (email: string, gotOTP: string, subject: string) => {
    if (!gotOTP) {
      throw new AppError("No OTP Provided", 400);
    }
    const OTPExists = await redisServices.getRedisValue(
      redisServices.otp_key(email, subject),
    );
    if (!OTPExists) {
      throw new AppError("OTP Expired", 400);
    }
    if (!(await compare(gotOTP, OTPExists))) {
      throw new AppError("OTPs don't match", 400);
    }
  };
  confirmEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { gotOTP, email, subject } = req.body;
    this.verifyOTP(email, gotOTP, subject);
    await this._userRepo.updateOne({
      filter: { email, confirmed: false },
      update: { confirmed: true },
      options: null,
    });
    await redisServices.deleteRedisValue(
      redisServices.otp_key(email, "confirmEmail"),
    );
    return res.json({ res, message: `confirmed` });
  };
  // dah lesa msh kamel
  resendOTP = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await this._userRepo.findOne({
      filter: { email, isConfirmed: false },
    });
    if (!user) {
      throw new AppError("User doesn't exist or already confirmed", 400);
    }
  };

}
