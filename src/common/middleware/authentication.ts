import { NextFunction, Request, Response } from "express";
import {
  extractTokenFromHeaders,
  verifyAccessToken,
} from "../utils/auth/token";
import { AppError } from "../utils/response/global-error-handler";
import { IUser } from "../../auth.dto";
import { Types } from "mongoose";
import userModel from "../../models/user.model";
import BaseRepository from "../../DB/repository/base.repository";
import UserRepository from "../../DB/repository/user.repository";
declare global {
  namespace Express {
    interface Request {
      userId?: Types.ObjectId;
      role?: string;
      userEmail?: string;
      user?: IUser;
    }
  }
}
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = extractTokenFromHeaders(req.headers.authorization as string);
  const decoded = verifyAccessToken(token as string) as IUser
  // verifyAccessToken can return a raw string if the token was signed with a plain string payload (not an object)
  req.userId = decoded._id
  req.userEmail = decoded.email
  req.role = decoded.role
  req.user = decoded
  next();
  const userRepository = new UserRepository(userModel);
  // const user = await userRepository.findById(req.userId);
  // if (!user) {
  //     throw new Error("user doesn't exist");
  //   }
  
};
