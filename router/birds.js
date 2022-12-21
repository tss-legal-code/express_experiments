const express = require('express');

const router = express.Router();

// middleware for this router
router.use(function timeLog(req, res, next) {
  console.log('Router Time: ', Date.now());
  next();
})

// actual routes
router.get('/', function (req, res) {
  res.send("Birds' home page");
})
router.get('/about', function (req, res) {
  res.send("About birds");
})

module.exports = router;
