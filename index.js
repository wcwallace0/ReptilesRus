const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Set view engine
app.set("view engine", "ejs");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
const indexRoutes = require('./routes/indexRoutes');
const cartRoutes = require('./routes/cartRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');


// Use routes
app.use('/', indexRoutes);
app.use('/', cartRoutes);
app.use('/', loginRoutes);
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', adminRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
