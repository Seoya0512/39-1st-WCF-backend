import { Request, Response, NextFunction } from "express";

import { userService } from "../services";
import { catchAsync, raiseCustomError } from "./error";

import jwt, { JwtPayload } from "jsonwebtoken";

export interface IGetUserAuthInfoRequest extends Request {
  user?: {
    id: number;
    username: string;
    name: string;
    email: string;
    password: string;
  };
}

const secretKey = process.env.JWT_SECRET_KEY;

export const loginRequired = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      raiseCustomError("NEED_ACCESS_TOKEN", 401);
    }

    const payLoad = (await jwt.verify(accessToken, secretKey)) as JwtPayload;

    if (!("userId" in payLoad)) {
      raiseCustomError("INVALID_TOKEN", 401);
    }

    const user = await userService.getUserById(payLoad.userId);
    console.log(typeof user);
    console.log(user);

    if (!user) {
      raiseCustomError("USER_DOES_NOT_EXIST", 401);
    }

    req.user = user;

    next();
  }
);
