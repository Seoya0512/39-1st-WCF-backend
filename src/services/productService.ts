import * as productDao from "../models/productDao";

export const getProductDetail = async (productId: string) => {
  return await productDao.getProductDetail(productId);
};

export const getProductList = async (params) => {
  return await productDao.getProductList(params);
};
