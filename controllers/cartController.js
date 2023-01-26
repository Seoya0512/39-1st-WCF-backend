const cartService = require("../services/cartService");
const { catchAsync, raiseCustomError } = require("../utils/error");

const addCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productOptionId, quantity } = req.body;

  if (!productOptionId || !quantity) {
    raiseCustomError("INVALID_INPUT", 400);
  }

  await cartService.addCart(userId, productOptionId, quantity);

  return res.status(201).json({ message: "SUCCESSFULLY_ADDED" });
});

const getUserCart = catchAsync(async (req, res) => {
  const userId = req.user.id;

  await cartService.getUserCart(userId);

  res.status(200).json({ data: UserCart });
});

const oneDeleteCart = catchAsync(async (req, res) => {
  const cartId = req.body.cartId;

  if (!cartId) {
    raiseCustomError("BAD_REQUEST", 400);
  }

  await cartService.oneDeleteCart(req.user.id, cartId);
  res.status(200).json({ message: "SUCCESSFULLY_DELETED" });
});

module.exports = {
  addCart,
  getUserCart,
  oneDeleteCart,
};
