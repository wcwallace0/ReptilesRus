const productModel = require('../models/productModel')

async function loadProducts(req, res){
    try {
        const products = await productModel.getProducts();
        res.render('products', { products })
    } catch (error) {
        // Handle database query errors
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    loadProducts
}