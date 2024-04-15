const cartModel = require('../models/cartModel');
// const cookieSession = require('cookie-session');

// router.use(cookieSession({
//     name: 'session',
//     secret: 'asdfghjkl;',
//     maxAge: 10 * 60 * 1000,
//     secure: false
// }));

async function getUserCart(req, res) {
   cart = await cartModel.getCart('ddokupil@trinity.edu');
    try {
        if (cart) {
            // Successful login, redirect to a dashboard or profile page
            console.log("cart controller true");
            console.log(cart);
            res.render('cart', {cart});
        } else {
            // Username or password is incorrect, redirect back to the login page
            res.send('no cart');
        }
    } catch (error) {
        // Handle database query errors
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function checkout(req, res){
    const session = req.body.session;
    try {
        if (session !== undefined && session.isPopulated){
            const cart = await cartModel.getCart(session['secret']);
            console.log(cart);
            res.render('checkout', {cart});
        }
    } catch(error){
        console.log(error);
        res.render('checkout', {});
    }
}

module.exports = {
    getUserCart, checkout
};