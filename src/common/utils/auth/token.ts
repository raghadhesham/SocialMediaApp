import { randomUUID } from "node:crypto";
import * as jwt from "jsonwebtoken";
import { AppError } from "../response/global-error-handler";
import { Types } from "mongoose";
import { IUser } from "../../../DB/models/user.model";
import { config } from "../../../config/config.services";

export const generateAccessToken = (payload: IUser) => {
  const jwtId = randomUUID();
  console.log("exp", config.jwt.ACCESS_TOKEN_EXPIRES_IN);

  return jwt.sign(payload, config.jwt.ACCESS_KEY as string, {
    expiresIn: config.jwt.ACCESS_TOKEN_EXPIRES_IN as any,
    jwtid: jwtId,
  });
};
export const generateRefreshToken = (payload: IUser) => {
  const jwtId = randomUUID();
  return jwt.sign(payload, config.jwt.REFRESH_KEY as string, {
    expiresIn: config.jwt.REFRESH_TOKEN_EXPIRES_IN as any,
    jwtid: jwtId,
  });
};
export const verifyAccessToken = (token: string) => {
  try {
    console.log(token);

    return jwt.verify(token, config.jwt.ACCESS_KEY as string) as IUser;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Token has Expired", 401);
    }
    if (error.name === "JsonWebTokenError") {
      throw new AppError("Token is invalid", 401);
    }
    throw new AppError("Token verification FAILED", 401);
  }
};
export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, config.jwt.REFRESH_KEY as string);
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Token has Expired", 401);
    }
    if (error.name === "JsonWebTokenError") {
      throw new AppError("Token is invalid", 401);
    }
    throw new AppError("Token verification FAILED", 401);
  }
};

export const createTokenPayload = (user: IUser) => {
  return {
    _id: user._id,
    email: user.email,
    role: user.role,
    // user:signupre
  };
};
export const extractTokenFromHeaders = (authHeaders: string) => {
  try {
    if (!authHeaders) {
      throw new AppError("No Token provided", 401);
    }
    if (!authHeaders.startsWith("bearer ")) {
      throw new AppError("Invalid Prefix", 401);
    }
    return authHeaders.split(" ")[1];
  } catch (error) {
    console.log(error);
  }
};
