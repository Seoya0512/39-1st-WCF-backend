const { appDataSource } = require('./dataSource');

const addCart = async (userId, productOptionId, quantity) => {
    const addCart = await appDataSource.query(
        `
        INSERT INTO carts(
            user_id,
            product_option_id,
            quantity
        ) values(?,?,?);`,[userId, productOptionId, quantity]
    ) 
    return addCart[0];
};

const searchCartId = async(userId, productOptionId) => {
    return await appDataSource.query(
        `SELECT
        id
        From carts
        WHERE user_id=? AND product_option_id=?`,
        [userId,productOptionId]
    )
};

const plusQuantity = async(searchCartId)=>{
    return await appDataSource.query(
        `UPDATE carts
        SET quantity = quantity +1
        WHERE id = ?`
        ,[searchCartId]
    )
}

const getUserCart = async (userId) => {
    const result = await appDataSource.query(
        `SELECT  
        carts.quantity as count,
        product_options.product_id as id,
        sizes.size,
        products.thumbnail as src,
        products.title,
        products.price,
        brands.name as brand 
        From carts
        LEFT JOIN product_options ON carts.id=product_options.id
        LEFT JOIN products ON product_options.product_id=products.id
        LEFT JOIN sizes ON product_options.size_id=sizes.id
        LEFT JOIN brands ON products.brand_id=brands.id
        LEFT JOIN users ON carts.user_id=users.id
        WHERE users.id=?
        `, [userId]
        )     

    return result;
};

const oneDeleteCart = async( userId, cartId)=>{
    function filterBuilder(value) {
     if(cartId.length===1){
        return `c.product_optionid = ${value}`
      }else{
        return `c.product_option_id in (${value})`;
      }
    }

    console.log(filterBuilder(cartId))

    const oneDeleteCart= await appDataSource.query(
        `DELETE FROM carts c
        WHERE c.user_id=? AND ${filterBuilder(cartId)}
        `,[userId]
    )
    return oneDeleteCart
}
module.exports = {
    addCart,
    searchCartId,
    plusQuantity,
    getUserCart,
    oneDeleteCart
}