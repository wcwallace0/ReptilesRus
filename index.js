const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

// Set view engine
app.set("view engine", "ejs");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const indexRoutes = require('./routes/indexRoutes');
const cartRoutes = require('./routes/cartRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Use routes
app.use('/', indexRoutes);
app.use('/', cartRoutes);
app.use('/', loginRoutes);
app.use('/', userRoutes);
app.use('/', productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


