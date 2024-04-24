const pool = require('../database/DB');

async function getCart(username){
    try {
        const connection = await pool.getConnection();
        const sql = 'SELECT ProdName, ProdPrice, quantity, cart.ProductID FROM cart inner join product on cart.productID = product.productID where customerID = ?';
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

async function changeQuant(customer, id, quantity) {
    try {
        const connection = await pool.getConnection();

        // Check if the product already exists in the user's cart
        const existingCartItem = await connection.execute(
            'SELECT * FROM cart WHERE customerID = ? AND ProductID = ?',
            [customer, id]
        );

        if (quantity === 0) {
            // If the quantity is 0, delete the row from the cart table
            await connection.execute(
                'DELETE FROM cart WHERE customerID = ? AND ProductID = ?',
                [customer, id]
            );
        } else if (existingCartItem[0].length > 0) {
            // If the product exists and the quantity is not 0, update the quantity to the specified quantity
            await connection.execute(
                'UPDATE cart SET quantity = ? WHERE customerID = ? AND ProductID = ?',
                [quantity, customer, id]
            );
        } else {
            // If the product doesn't exist and the quantity is not 0, insert a new row into the cart table with the specified quantity
            await connection.execute(
                'INSERT INTO cart (customerID, ProductID, quantity) VALUES (?, ?, ?)',
                [customer, id, quantity]
            );
        }

        // Release the connection
        connection.release();
    } catch (error) {
        console.error('Error updating product quantity:', error);
        throw error;
    }
}

async function emptyCart(customer){
    try {
        const connection = await pool.getConnection();
        const sql = 'delete from cart where CustomerID = ?';
        await connection.execute(sql, [customer]);
        console.log('cart empty');
    } catch (e){
        console.error("error emptying cart: ", e);
        throw e;
    }
}



module.exports = {
    getCart,
    addToCart,
    changeQuant,
    emptyCart
};