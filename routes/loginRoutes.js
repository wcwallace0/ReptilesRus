const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();
const { login, createUser} = require('../controllers/logincontroller');

router.use(cookieSession({
    name: 'session',
    secret: 'asdfghjkl;',
    maxAge: 10 * 60 * 1000,
    secure: false
}));

router.get('/login', (req, res) => {
    console.log(req.session);
    console.log(req.session.isPopulated);
    if (req.session.isPopulated){
        res.send("You're already logged in <a href=logout>Logout</a>");
    }else{
        res.render('login');
    }
});

router.post('/login', login);

router.post('/submit', createUser);
module.exports = router;
