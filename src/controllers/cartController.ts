import { cartService } from "../services";
import { catchAsync, raiseCustomError } from "../utils/error";
import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../utils/auth";

export const addCart = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { productOptionId, quantity } = req.body;

    await cartService.addCart(req.user.id, productOptionId, quantity);
    return res.status(201).json({ message: "Success add cart" });
  }
);

export const getUserCart = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const userId = req.user.id;

    const UserCart = await cartService.getUserCart(userId);
    res.status(200).json({ data: UserCart });
  }
);

export const oneDeleteCart = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const cartId = req.body.cartId;

    if (!cartId) {
      raiseCustomError("ID_NOT_EXIST", 400);
    }
    await cartService.oneDeleteCart(req.user.id, cartId);
    res.status(200).json({ message: "Delete one cart" });
  }
);
