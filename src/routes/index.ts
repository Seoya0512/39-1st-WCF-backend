import express from "express";

const router = express.Router();

import { userRouter } from "./userRouter";
import { productRouter } from "./productRouter";
import { cartRouter } from "./cartRouter";

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/cart", cartRouter);

export { router };
