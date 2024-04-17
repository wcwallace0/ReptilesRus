const pool = require('../database/DB');

async function getProducts(){
    try {
        // Query to retrieve all products
        const [rows, fields] = await pool.query('SELECT * FROM product');

        // Return the retrieved products
        return rows;
    } catch (error) {
        // Handle errors
        console.error('Error retrieving products:', error);
        throw error;
    }
}


module.exports = {
    getProducts
}