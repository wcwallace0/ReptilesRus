const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();
const {getUserCart, addToCart, updateCart, checkout, pay, emptyCart} = require('../controllers/cartController');

router.use(cookieSession({
    name: 'session',
    secret: 'asdfghjkl;',
    maxAge: 10 * 60 * 1000,
    secure: false
}));


router.get('/cart', getUserCart);

router.get('/checkout', checkout);

router.get('/emptyCart', emptyCart);

router.post("/addToCart",addToCart);

router.post("/updateCart", updateCart);

router.post("/pay", pay);

module.exports = router;