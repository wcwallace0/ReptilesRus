const userModel = require('../models/userModel');

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await userModel.getUserByUsernameAndPassword(username, password);
        
        if (user) {
            // Successful login, redirect to a dashboard or profile page
            res.redirect('/');
        } else {
            // Username or password is incorrect, redirect back to the login page
            res.redirect('/login');
        }
    } catch (error) {
        // Handle database query errors
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    login
};
