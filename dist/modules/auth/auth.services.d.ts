import { NextFunction, Request, Response } from "express";
export declare class AuthService {
    private readonly _userModel;
    constructor();
    signup: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    signin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=auth.services.d.ts.map