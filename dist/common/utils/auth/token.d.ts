import * as jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { IUser } from "../../../auth.dto";
export declare const generateAccessToken: (payload: IUser) => string;
export declare const generateRefreshToken: (payload: IUser) => string;
export declare const verifyAccessToken: (token: string) => IUser;
export declare const verifyRefreshToken: (token: string) => string | jwt.JwtPayload;
export declare const createTokenPayload: (user: IUser) => {
    _id: Types.ObjectId;
    email: string;
    role: string;
};
export declare const extractTokenFromHeaders: (authHeaders: string) => string | undefined;
//# sourceMappingURL=token.d.ts.map