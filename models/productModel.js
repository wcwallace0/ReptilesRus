const pool = require('../database/DB');

async function getProducts(cond){
    try {
        // Query to retrieve all products
        if (cond){
            const [rows, _] = await pool.query('SELECT * FROM product');
            return rows;
        }else{
            const [rows, _] = await pool.query('SELECT * FROM product WHERE ProdQuantity > 0');
            return rows;
        }
        
        // Return the retrieved products

    } catch (error) {
        // Handle errors
        console.error('Error retrieving products:', error);
        throw error;
    }
}

async function findById(id){
    try {
        // Query to retrieve the product by id
        const [rows, _] = await pool.query('SELECT * FROM product WHERE ProductID = ?', [id]);

        // Return the retrieved detail
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        // Handle errors
        console.error('Error retrieving products:', error);
        throw error;
    }
}

async function dropPurchased(cart){
    try {
        const connection = await pool.getConnection();
        let currentProductsSql = 'select ProductID, ProdQuantity from product where productID in ';

        let idString = '(';
        for (item of cart){
            idString += (item.ProductID - 0);
            if (cart[cart.length - 1] !== item){
                idString += ",";
            }
        }
        idString += ")";
        currentProductsSql += idString;
        let [currentProducts, _] = await connection.execute(currentProductsSql);
        const newQuantitySql = 'update product set prodQuantity = ? where productID = ?';
        for (shelfItem of currentProducts){
            for (cartItem of cart){
                if(shelfItem.ProductID === cartItem.ProductID){
                    if (shelfItem.ProdQuantity - cartItem.quantity < 0){
                        return false;
                    }
                }
            }
        }
        for (shelfItem of currentProducts){
            for (cartItem of cart){
                if(shelfItem.ProductID === cartItem.ProductID){
                    await connection.execute(newQuantitySql, [shelfItem.ProdQuantity - cartItem.quantity, cartItem.ProductID]);
                }
            }
        }
        return true;
    } catch (error) {
        // Handle errors
        console.error('Error dropping purchased items:', error);
        throw error;
    }
}

async function updateProduct(ProductID, prodName, prodDesc, prodPrice, prodQuanity){
    const sql = 'UPDATE product SET ProdName = ?, ProdDesc = ?, ProdPrice = ?, ProdQuantity = ? WHERE ProductID = ?';
    values = [prodName, prodDesc, prodPrice, prodQuanity, ProductID]
    try{
        const connection = await pool.getConnection()
        const [rows, _] = await connection.execute(sql, values)
        connection.release()
        return rows
    }catch(error){
        console.error('Error updating product:', error);
        throw error;
    }
}


module.exports = {
    getProducts,
    findById,
    dropPurchased,
    updateProduct
}