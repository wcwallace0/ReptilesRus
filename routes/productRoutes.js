const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
    const products = [
        { name: "Product 1", description: "Description 1", price: 10 },
        { name: "Product 2", description: "Description 2", price: 20 }
    ];
    res.render('products', { products });
});

module.exports = router;
