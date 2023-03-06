import express from "express";
import { userController } from "../controllers";

const userRouter = express.Router();

userRouter.post("/signup", userController.signUp);
userRouter.post("/signin", userController.signIn);

export { userRouter };
