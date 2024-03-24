const express = require('express');
const router = express.Router();
const { login, createUser} = require('../controllers/logincontroller');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', login);

router.post('/submit', createUser);
module.exports = router;
