import { cartService } from "../services";
import { catchAsync, raiseCustomError } from "../utils/error";
import type { IGetUserAuthInfoRequest } from "../utils/auth";
import { Response } from "express";
import { type } from "os";

export const addCart = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const userId = req.user.id;
    const { productOptionId, quantity } = req.body;

    if (!productOptionId || !quantity) {
      raiseCustomError("INVALID_INPUT", 400);
    }

    await cartService.addCart(userId, productOptionId, quantity);

    return res.status(201).json({ message: "SUCCESSFULLY_ADDED" });
  }
);

export const getUserCart = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const userId = req.user.id;

    const UserCart = await cartService.getUserCart(userId);
    res.status(200).json({ data: UserCart });
  }
);

export const deleteCart = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const cartId = req.body.productOptionId;
    const userId = req.user.id;

    if (!cartId) {
      raiseCustomError("ID_NOT_EXIST", 400);
    }
    await cartService.deleteCart(userId, cartId);
    res.status(200).json({ message: "SUCCESSFULLY_DELETED" });
  }
);
