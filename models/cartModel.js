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
        // const connection = await pool.getConnection();
        // const sql = 'INSERT INTO customer (customerID, passwd, paymentinfo) VALUES (?, ?, 0)';
        // const values = [username, password];
        
        // // Execute the query
        // const [rows, fields] = await connection.execute(sql, values);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCart
};