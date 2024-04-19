const cartModel = require('../models/cartModel');
// const cookieSession = require('cookie-session');

// router.use(cookieSession({
//     name: 'session',
//     secret: 'asdfghjkl;',
//     maxAge: 10 * 60 * 1000,
//     secure: false
// }));

async function getUserCart(req, res) {
    if(!req.session.isPopulated){
        res.redirect('/login')
        return
}
   cart = await cartModel.getCart(req.session.secret);
    try {
        if (cart) {
            // Successful login, redirect to a dashboard or profile page
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
    if (session.isPopulated){
        const cart = await cartModel.getCart(session['secret']);
        res.render('checkout', {cart});
    }
    try {

    } catch(error){
        console.error('Error querying database', error);
        res.status(500).send('Internal Server Error');
    }
}

async function addToCart(req,res){
    if(!req.session.isPopulated){
        res.status(201).send("Not logged in")
        return
    }
    const {productId} = req.body
    const {secret} = req.session
    try{
        await cartModel.addToCart(secret,productId)
    }catch (error){
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function updateCart(req, res){
    if(!req.session.isPopulated){
        res.status(201).send("Not logged in")
        return
    }
    const {itemId, quantity} = req.body
    const {secret} = req.session
    try{
        await cartModel.changeQuant(secret,itemId,quantity)
    }catch (error){
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    getUserCart,
    checkout,
    addToCart,
    updateCart
};