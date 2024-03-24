const pool = require('../database/DB');

async function getUserByUsernameAndPassword(username, password) {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    }
}


async function createUser(username, email, password) {
    try {
        const connection = await pool.getConnection();
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const values = [username, password];
        
        // Execute the query
        const [rows, fields] = await connection.execute(sql, values);
        
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
    createUser
};
