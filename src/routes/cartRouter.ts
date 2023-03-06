import express from "express";

const cartRouter = express.Router();

import { loginRequired } from "../utils/auth";
const { cartController } = require("../controllers");

cartRouter.delete("", loginRequired, cartController.oneDeleteCart);
cartRouter.post("", loginRequired, cartController.addCart);
cartRouter.get("", loginRequired, cartController.getUserCart);

export { cartRouter };
