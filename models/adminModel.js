const pool = require('../database/DB');

async function checkPassword(username, password){
    try {
        const [rows] = await pool.query('SELECT * FROM admin WHERE adminEmail = ? AND adminPassword = ?', [username, password]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    checkPassword
};