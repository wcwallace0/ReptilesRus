const adminModel = require('../models/adminModel');

async function adminValidate(req, res){
    const { username, password } = req.body;
    try {
        const admin = await adminModel.checkPassword(username, password);
        if(admin){
            req.session = {name: 'session-admin', secret: username, maxAge: 10 * 60 * 1000, secure: false};
            res.redirect('/adminProduct');
        }else{
            res.redirect('/admin');
        }
    } catch (e){
        console.log('Error validating admin:', e);
        throw e;
    }
}

// async function adminProduct(req, res){

// }

module.exports = {
    adminValidate // , adminProduct
};