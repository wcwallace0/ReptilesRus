const userModel = require('../models/userModel');
const productModel = require('../models/productModel')

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await userModel.getUserByUsernameAndPassword(username, password);
        
        if (user) {
            // Successful login, redirect to a dashboard or profile page
            req.session = {name: 'session', secret: username, maxAge: 10 * 60 * 1000, secure: false};
            res.redirect('/');
        } else {
            // Try admin login
            const admin = await userModel.getAdmin(username, password);
            if(admin){
                req.session = {name: 'session', secret: username, maxAge: 10 * 60 * 1000, secure: false};
                res.redirect('/admin') 
            }else{
                res.redirect('/login');
            }
        }
    } catch (error) {
        // Handle database query errors
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
    }
}


async function createUser(req, res){
    const { username, password } = req.body;
    try {
        // Insert user information into the database
        await userModel.createUser(username, password);
        req.session = {name: 'session', secret: username, maxAge: 10 * 60 * 1000, secure: false};
        res.redirect('/');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
};

async function adminLogin(req, res){
    if(req.session.isPopulated && req.session.secret === "admin"){
        try {
            const products = await productModel.getProducts();
            res.render('admin', { products})
        } catch (error) {
            // Handle database query errors
            console.error('Error querying database:', error);
            res.status(500).send('Internal Server Error');
        }
    }else{
        res.redirect('/login')
    }
}

module.exports = {
    login,
    createUser,
    adminLogin
};
