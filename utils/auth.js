const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const userService = require("../services/userService");
const { catchAsync, raiseCustomError } = require("./error");

const loginRequired = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    raiseCustomError("NEED_ACCESS_TOKEN", 401);
  }

  const payLoad = await jwt.verify(accessToken, secretKey);
  const user = await userService.getUserById(payLoad.userId);

  if (!user) {
    raiseCustomError("USER_DOES_NOT_EXIST", 401);
  }

  req.user = user;
});

module.exports = { loginRequired };
