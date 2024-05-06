const cartModel = require('../models/cartModel');
const {dropPurchased} = require("../models/productModel");
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
        // Username or password is incorrect, redirect back to the login page
        console.log(error);
        res.status(500).send("Internal server error")
    }
}

async function checkout(req, res){
    const session = req.session;
    try {
        const cart = await cartModel.getCart(session['secret']);
        res.render('checkout', {cart});
    } catch(error){
        console.log(error);
        res.render('checkout', {});
    }
}

async function addToCart(req,res){
    if(!req.session.isPopulated){
        res.status(300).send("You must be logged in to add a product to your cart.")
        return
    }
    const {productId} = req.body
    const {secret} = req.session
    try {
        if(secret === "admin"){
            res.status(201).send("admin")
            return
        }
        await cartModel.addToCart(secret,productId)
        res.status(200).send('Product added successfully!');
    } catch (error){
        console.error('Error querying database:', error);
        res.status(500).send('Failed to add product to cart.');
    }
}

async function updateCart(req, res){
    if(!req.session.isPopulated){
        res.status(201).send("Not logged in");
        return
    }
    const {itemId, quantity} = req.body;
    const {secret} = req.session;
    try {
        await cartModel.changeQuant(secret,itemId,quantity);
        res.status(200).send('Cart successfully updated');
    } catch (error){
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function pay(req, res){
    if(!req.session.isPopulated){
        res.status(201).send("Not logged in");
    }
    const {secret} = req.session;
    try{
        let message = '';
        const cart = await cartModel.getCart(secret);
        if (cart !== undefined && cart.length !== 0){
            const purchaseResult = await dropPurchased(cart);
            console.log(purchaseResult);
            if (purchaseResult){
                // Empty cart
                cartModel.emptyCart(secret);

                // Build order summary and add order entry to database
                message = await cartModel.placeOrder(secret, cart);
            } else {
                message = 'A product is no longer in stock';
            }
        } else {
            message = 'You cannot checkout an empty cart';
        }
        res.status(200).send(message);
        //res.redirect("cart");
    }catch (error){
        console.error('Error querying database:', error);
        if (typeof error === 'string' && error.contains("Product not in stock")){
            res.status(404).send("Error 404: A product is no longer in stock");
        }else{
            res.status(500).send('Internal Server Error', error);
        }
    }
}

async function emptyCart(req, res){
    if(!req.session.isPopulated){
        res.status(201).send("Not logged in");
    }
    const {secret} = req.session;
    try{
        await cartModel.emptyCart(secret)
        res.redirect("cart");
    }catch (error){
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getUserCart,
    checkout,
    addToCart,
    updateCart,
    pay,
    emptyCart
};