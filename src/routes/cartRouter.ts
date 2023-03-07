import express from "express";

const cartRouter = express.Router();

import { loginRequired } from "../utils/auth";
import { cartController } from "../controllers";

cartRouter.post("", loginRequired, cartController.addCart);
cartRouter.get("", loginRequired, cartController.getUserCart);
cartRouter.delete("", loginRequired, cartController.deleteCart);

export { cartRouter };
