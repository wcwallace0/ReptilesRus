const mysql = require('mysql2');

// MySQL database configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'LOLdick18',
    database: 'pets' // Name of the database you created
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;