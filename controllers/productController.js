const productService = require("../services/productService");
const { catchAsync, raiseCustomError } = require("../utils/error");

const getProductDetail = catchAsync(async (req, res) => {
  const productId = req.params.productId;

  if (!productId) {
    raiseCustomError("BAD_REQUEST", 400);
  }

  const productDetail = await productService.getProductDetail(productId);

  return res.status(200).json({ data: productDetail });
});

const getProductList = catchAsync(async (req, res) => {
  const products = await productService.getProductList(req.query);

  return res.status(200).json({ data: products });
});

module.exports = {
  getProductDetail,
  getProductList,
};
