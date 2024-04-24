const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();
const {adminValidate} = require("../controllers/adminController");


router.use(cookieSession({
    name: 'session-admin',
    secret: 'qwertyuiop',
    maxAge: 10 * 60 * 1000,
    secure: false
}));

router.get('/adminLogin', (req, res) => {
    if (req.session.isPopulated){
        res.redirect('/adminProduct')
    }else{
        res.render('adminLogin');
    }
});

router.post('/adminValidate', adminValidate);

// router.get('/adminProduct', adminProduct);

module.exports = router;