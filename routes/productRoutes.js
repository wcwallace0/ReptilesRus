const express = require('express');
const { loadProducts, productDetail } = require('../controllers/productsController');
const router = express.Router();


router.get('/product/:productID', productDetail)
router.get('/products', loadProducts)

module.exports = router;
