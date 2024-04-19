const cartModel = require('../models/cartModel');
// const cookieSession = require('cookie-session');

// router.use(cookieSession({
//     name: 'session',
//     secret: 'asdfghjkl;',
//     maxAge: 10 * 60 * 1000,
//     secure: false
// }));

async function getUserCart(req, res) {
    const session = req.session;
    try {
        const cart = await cartModel.getCart(session['secret']);
        // Successful login, redirect to a dashboard or profile page
        console.log("cart controller true");
        console.log(cart);
        res.render('cart', {cart});
    } catch (error) {
        // Username or password is incorrect, redirect back to the login page
        console.log(error);
        res.send('no cart');
    }
}

async function checkout(req, res){
    const session = req.session;
    try {
        const cart = await cartModel.getCart(session['secret']);
        console.log(cart);
        res.render('checkout', {cart});
    } catch(error){
        console.log(error);
        res.render('checkout', {});
    }
}

module.exports = {
    getUserCart, checkout
};