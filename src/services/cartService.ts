const cartDao = require("../models/cartDao");

export const addCart = async (
  userId: string,
  productOptionId: string,
  quantity: string
) => {
  const searchCartId = await cartDao.searchCartId(userId, productOptionId);

  if (searchCartId.length == 0) {
    return await cartDao.addCart(userId, productOptionId, quantity);
  } else {
    return await cartDao.searchCartId(searchCartId[0].id, quantity);
  }
};

export const getUserCart = async (userId: string) => {
  return await cartDao.getUserCart(userId);
};

export const oneDeleteCart = async (userId: string, cartId: string) => {
  console.log(typeof userId, typeof cartId);
  return await cartDao.oneDeleteCart(userId, cartId);
};
