import { NextFunction, Request, Response } from "express";
export declare class AuthService {
    private readonly _userRepo;
    constructor();
    signup: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    signin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    sendOTP: (email: string, subject: string) => Promise<void>;
    verifyOTP: (email: string, gotOTP: string, subject: string) => Promise<void>;
    confirmEmail: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    resendOTP: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=auth.services.d.ts.map