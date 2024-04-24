const express = require('express');
const { loadProducts, productDetail, editProduct, updateProduct} = require('../controllers/productsController');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
    name: 'session',
    secret: 'asdfghjkl;',
    maxAge: 10 * 60 * 1000,
    secure: false
}));
router.get('/product/:productID', productDetail)
router.get('/edit/:productID', editProduct)
router.get('/products', loadProducts)
router.post('/updateProduct', updateProduct)

module.exports = router;
