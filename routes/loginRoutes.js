const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();
const { login, createUser} = require('../controllers/logincontroller');

// Session middleware
router.use(cookieSession({
    name: 'session',
    secret: 'asdfghjkl;',
    maxAge: 10 * 60 * 1000,
    secure: false
}));

router.get('/login', (req, res) => {
    if (req.session.isPopulated){
        res.send("You're already logged in <a href=logout>Logout</a>");
    }else{
        res.render('login');
    }
});

router.post('/login', login);

router.get('/logout', (req, res) => {
    req.session = null;
    res.send("You've been logged out. <a href=login>Log in again</a>");
});

router.post('/submit', createUser);
module.exports = router;
