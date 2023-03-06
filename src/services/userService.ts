import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

import * as userDao from "../models/userDao";
import { raiseCustomError } from "../utils/error";
import { validatePw, validateUsername } from "../utils/validate";

export const signUp = async (
  username: string,
  password: string,
  name: string,
  mobile_number: string,
  email: string,
  address: string
) => {
  validateUsername(username);
  validatePw(password);

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await userDao.createUser(
    username,
    hashedPassword,
    name,
    mobile_number,
    email,
    address
  );

  return user;
};

export const signIn = async (username: string, password: string) => {
  validateUsername(username);
  validatePw(password);

  const user = await userDao.getUserByUsername(username);

  const is_match = await bcrypt.compare(password, user.password);

  if (!is_match) {
    return raiseCustomError("INVALID USER", 401);
  }

  const payLoad = { userId: user.id };
  const accessToken = jwt.sign(payLoad, secretKey);
  return accessToken;
};

export const getUserById = async (id) => {
  return await userDao.getUserById(id);
};
