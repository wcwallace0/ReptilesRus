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

async function addToCart(customer,id){
    try{
        const connection = await pool.getConnection();
        const sql = 'INSERT INTO cart (customerID, ProductID, quantity) VALUES (?, ?, 1)'
        const values = [customer,id]

        const [rows, _] = await connection.execute(sql, values);
        
        // Release the connection
        connection.release();
    }

    catch(error){
        console.error('Error creating user:', error);
        throw error;
    }
}
module.exports = {
    getCart,
    addToCart
};