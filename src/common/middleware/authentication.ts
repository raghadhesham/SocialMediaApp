import { NextFunction, Request, Response } from "express";
import {
  extractTokenFromHeaders,
  verifyAccessToken,
} from "../utils/auth/token";
import { Types } from "mongoose";
import userModel, { IUser } from "../../models/user.model";
import BaseRepository from "../../DB/repository/base.repository";
import UserRepository from "../../DB/repository/user.repository";
declare global {
  namespace Express {
    interface Request { //3ayzeen nzawed 7agat 3l properties elly mawgoda fe Request bta3t express
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
  const userRepository = new UserRepository(userModel);
  const user = await userRepository.findById({id:req.userId!});
  if (!user) {
    throw new Error("user doesn't exist");
  }
  next();
  
};
