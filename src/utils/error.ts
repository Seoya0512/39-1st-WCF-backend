import { Request, Response, NextFunction } from "express";

export interface Error {
  statusCode?: number;
  code?: number;
  stack?: string;
  message?: string;
}

export const catchAsync = (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((error) => next(error));
  };
};

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({ message: err.message });
};

export const raiseCustomError = (message?: string, statusCode?: number) => {
  const err: Error = new Error(message);
  err.statusCode = statusCode;
  throw err;
};
