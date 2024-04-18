const pool = require('../database/DB');

async function getCart(username){
    try {
        const connection = await pool.getConnection();
        const sql = 'SELECT ProdName, ProdPrice, quantity FROM cart inner join product on cart.productID = product.productID where customerID = ?';
        const values = [username];
        // return rows.length > 0 ? rows[0] : null;

        const [rows, _] = await connection.execute(sql, values);

        connection.release();
        return rows;
;
    } catch (error) {
        throw error;
    }
}

async function addToCart(customer, id) {
    try {
        const connection = await pool.getConnection();

        // Check if the product already exists in the user's cart
        const existingCartItem = await connection.execute(
            'SELECT * FROM cart WHERE customerID = ? AND ProductID = ?',
            [customer, id]
        );
        if (existingCartItem[0].length > 0) {
            // If the product exists, update the quantity by incrementing it
            await connection.execute(
                'UPDATE cart SET quantity = quantity + 1 WHERE customerID = ? AND ProductID = ?',
                [customer, id]
            );
        } else {
            // If the product doesn't exist, insert a new row into the cart table with a quantity of 1
            await connection.execute(
                'INSERT INTO cart (customerID, ProductID, quantity) VALUES (?, ?, 1)',
                [customer, id]
            );
        }
        
        // Release the connection
        connection.release();
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
}
module.exports = {
    getCart,
    addToCart
};