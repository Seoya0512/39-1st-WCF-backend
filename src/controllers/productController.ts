import { productService } from "../services";
import { catchAsync } from "../utils/error";

import { Request, Response } from "express";

export const getProductDetail = catchAsync(
  async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const productDetail = await productService.getProductDetail(productId);

    return res.status(200).json({ data: productDetail });
  }
);

export const getProductList = catchAsync(
  async (req: Request, res: Response) => {
    const products = await productService.getProductList(req.query);

    return res.status(200).json({ data: products });
  }
);
