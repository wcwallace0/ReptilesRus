const express = require('express');
const router = express.Router();

router.get('/create-user', (req, res) => {
    res.render('create-user');
});

module.exports = router;
