const productModel = require('../models/productModel')

async function loadProducts(req, res){
    try {
        const products = await productModel.getProducts();
        res.render('productListing', { products})
    } catch (error) {
        // Handle database query errors
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function productDetail(req,res){
    try {
        // Extract the product ID from the URL parameters
        const productId = req.params.productID;

        // Fetch the product details from the database using the Product model
        const product = await productModel.findById(productId);

        // Render a view with the product details
        res.render('productDetails', { product });
        console.log(product.pictureID);
    } catch (error) {
        // Handle errors
        console.error('Error fetching product details:', error);
    }
}

module.exports = {
    loadProducts,
    productDetail,
}