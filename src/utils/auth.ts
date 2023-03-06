import { Request, Response, NextFunction } from "express";

export interface IGetUserAuthInfoRequest extends Request {
  user?: any;
}

import { userService } from "../services";
import { catchAsync, raiseCustomError } from "./error";

import jwt, { JwtPayload } from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

export const loginRequired = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      raiseCustomError("NEED_ACCESS_TOKEN", 401);
    }

    const payLoad = jwt.verify(accessToken, secretKey) as JwtPayload;

    if (!("userId" in payLoad)) {
      raiseCustomError("INVALID_TOKEN", 401);
    }

    const user = await userService.getUserById(payLoad.userId);

    if (!user) {
      raiseCustomError("USER_DOES_NOT_EXIST", 401);
    }

    req.user = user;
  }
);
