const express = require('express');
const router = express.Router();
const pool = require('../database/DB');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Query the database to check if the username and password exist and match
    pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
        if (error) {
            // Handle database query errors
            console.error('Error querying database:', error);
            return res.status(500).send('Internal Server Error');
        }
  
        // Check if any rows were returned
        if (results.length > 0) {
            // Successful login, redirect to a dashboard or profile page
            res.redirect('/');
        } else {
            // Username or password is incorrect, redirect back to the login page
            res.redirect('/login');
        }
    });
  });

module.exports = router;
