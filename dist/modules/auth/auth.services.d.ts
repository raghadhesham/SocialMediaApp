import { NextFunction, Request, Response } from "express";
declare class AuthService {
    private readonly _userModel;
    constructor();
    signup: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    signin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.services.d.ts.map