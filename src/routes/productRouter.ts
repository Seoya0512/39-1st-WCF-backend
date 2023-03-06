import express from "express";
import { productController } from "../controllers";

const productRouter = express.Router();

productRouter.get("/", productController.getProductList);
productRouter.get("/:productId", productController.getProductDetail);

export { productRouter };
