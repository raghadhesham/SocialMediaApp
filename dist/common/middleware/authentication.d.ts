import { NextFunction, Request, Response } from "express";
import { IUser } from "../../auth.dto";
import { Types } from "mongoose";
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
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authentication.d.ts.map