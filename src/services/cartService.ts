import * as cartDao from "../models/cartDao";

export const addCart = async (
  userId: number,
  productOptionId: number,
  quantity: number
) => {
  const searchCartId = await cartDao.searchCartId(userId, productOptionId);

  if (searchCartId.length == 0) {
    return await cartDao.addCart(userId, productOptionId, quantity);
  } else {
    return await cartDao.searchCartId(searchCartId[0].id, quantity);
  }
};

export const getUserCart = async (userId: number) => {
  return await cartDao.getUserCart(userId);
};

export const deleteCart = async (userId: number, cartId: number) => {
  return await cartDao.deleteCart(userId, cartId);
};
