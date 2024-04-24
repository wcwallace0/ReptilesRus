const pool = require('../database/DB');

async function getUserByUsernameAndPassword(username, password) {
    try {
        const [rows] = await pool.query('SELECT * FROM customer WHERE CustomerID = ? AND passwd = ?', [username, password]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    }
}

async function getAdmin(username, password) {
    try {
        const [rows] = await pool.query('SELECT * FROM admin WHERE adminEmail = ? AND adminPassword = ?', [username, password]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    }
}

async function createUser(username, password) {
    try {
        const connection = await pool.getConnection();
        const sql = 'INSERT INTO customer (customerID, passwd, paymentinfo) VALUES (?, ?, 0)';
        const values = [username, password];
        
        // Execute the query
        const [rows, _] = await connection.execute(sql, values);
        
        // Release the connection
        connection.release();

        return rows;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

module.exports = {
    getUserByUsernameAndPassword,
    createUser,
    getAdmin
};
