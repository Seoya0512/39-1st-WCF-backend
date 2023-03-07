import * as productDao from "../models/productDao";
export interface Query {
  subCategoryId?: string;
  brandId?: string;
  sizeId?: string;
  priceId?: string;
  sortMethod?: string;
}

export const getProductDetail = async (productId: string) => {
  return await productDao.getProductDetail(productId);
};

export const getProductList = async (params: Query) => {
  return await productDao.getProductList(params);
};
