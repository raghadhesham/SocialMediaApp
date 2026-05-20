import { NextFunction, Request, Response } from "express";
export class AppError extends Error {
  constructor(
    public message: any,
    public statusCode: number,
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}
export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode as number;
  res
    .status(err.statusCode || 500)
    .json({ message: err.message, statusCode, stack: err.stack });
};
