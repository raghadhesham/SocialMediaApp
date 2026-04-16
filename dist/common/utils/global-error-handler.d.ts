import { Request, Response } from "express";
export declare class AppError extends Error {
    message: any;
    statusCode: number;
    constructor(message: any, statusCode: number);
}
export declare const globalErrorHandler: (err: AppError, req: Request, res: Response) => void;
//# sourceMappingURL=global-error-handler.d.ts.map