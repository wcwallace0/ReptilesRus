const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {});
});

router.get('/contact', (req,res) => {
  res.render("contact")
})

router.post('/submitContactUs', (req, res) => {
  console.log(req.body)
  //do something about this
  res.render("contact")
})

router.get('/aboutUs', (req,res) => {
  res.render("aboutUs")
})

router.get('/services' , (req,res) => {
  res.render("services")
})



module.exports = router;
