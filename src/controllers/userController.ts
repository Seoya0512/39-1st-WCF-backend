import { userService } from "../services";
import { catchAsync } from "../utils/error";
import { Request, Response } from "express";

export const signUp = catchAsync(async (req: Request, res: Response) => {
  const { username, password, name, mobile_number, email, address } = req.body;

  if (!username || !password || !name || !mobile_number || !email || !address) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  await userService.signUp(
    username,
    password,
    name,
    mobile_number,
    email,
    address
  );

  return res.status(201).json({
    message: "SIGNUP_SUCCESS",
  });
});

export const signIn = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const accessToken = await userService.signIn(username, password);
  res.status(200).json({ accessToken });
});
