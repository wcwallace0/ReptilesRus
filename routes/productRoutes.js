const express = require('express');
const { loadProducts } = require('../controllers/productsController');
const router = express.Router();

router.get('/products', loadProducts)

module.exports = router;
