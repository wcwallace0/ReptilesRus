const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();
const {getUserCart, addToCart} = require('../controllers/cartController');

router.use(cookieSession({
    name: 'session',
    secret: 'asdfghjkl;',
    maxAge: 10 * 60 * 1000,
    secure: false
}));


router.get('/cart', getUserCart);

router.get('/checkout', (req, res) => {
    res.render('checkout');
});

router.post("/addToCart",addToCart )

module.exports = router;