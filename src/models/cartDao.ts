import { appDataSource } from "./dataSource";

export const addCart = async (
  userId: number,
  productOptionId: number,
  quantity: number
) => {
  const addCart = await appDataSource.query(
    `
        INSERT INTO carts(
            user_id,
            product_option_id,
            quantity
        ) values(?,?,?);`,
    [userId, productOptionId, quantity]
  );
  return addCart[0];
};

export const searchCartId = async (userId: number, productOptionId: number) => {
  return await appDataSource.query(
    `SELECT
        id
        From carts
        WHERE user_id=? AND product_option_id=?`,
    [userId, productOptionId]
  );
};

export const plusQuantity = async (searchCartId: number) => {
  return await appDataSource.query(
    `UPDATE carts
        SET quantity = quantity +1
        WHERE id = ?`,
    [searchCartId]
  );
};

export const getUserCart = async (userId: number) => {
  const result = await appDataSource.query(
    `SELECT  
      carts.quantity as count,
      product_options.id,
      sizes.size,
      products.thumbnail as src,
      products.title,
      products.price,
      brands.name as brand 
      From carts
    LEFT JOIN users ON carts.user_id=users.id
    LEFT JOIN product_options ON carts.product_option_id=product_options.id
    LEFT JOIN products ON product_options.product_id=products.id
    LEFT JOIN sizes ON product_options.size_id=sizes.id
    LEFT JOIN brands ON products.brand_id=brands.id
    WHERE carts.user_id=?; 
        `,
    [userId]
  );

  return result;
};

export const deleteCart = async (userId: number, cartId: number) => {
  const oneDeleteCart = await appDataSource.query(
    `DELETE FROM carts c
     WHERE c.user_id=? AND c.product_option_id = ?
    `,
    [userId, cartId]
  );
  return oneDeleteCart;
};
