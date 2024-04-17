const pool = require('../database/DB');

async function getProducts(){
    try {
        // Query to retrieve all products
        const [rows, _] = await pool.query('SELECT * FROM product WHERE ProdQuantity > 0');

        // Return the retrieved products
        console.log(rows)
        return rows;
    } catch (error) {
        // Handle errors
        console.error('Error retrieving products:', error);
        throw error;
    }
}

async function findById(id){
    try {
        // Query to retrieve the product by id
        const [rows, _] = await pool.query('SELECT * FROM product WHERE ProductID = ?', [id]);

        // Return the retrieved detail
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        // Handle errors
        console.error('Error retrieving products:', error);
        throw error;
    }
}

module.exports = {
    getProducts,
    findById
}