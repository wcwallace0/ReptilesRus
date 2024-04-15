require('dotenv').config(); // Load variables from .env file
console.log(process.env)
const mysql = require('mysql2/promise');

// Create a database configuration object using the environment variables
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};
console.log(dbConfig)
// Create the MySQL connection pool
const pool = mysql.createPool(dbConfig);

module.exports = pool;
