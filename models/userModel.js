const pool = require('../database/DB');

async function getUserByUsernameAndPassword(username, password) {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUserByUsernameAndPassword
};
