const express = require('express')
const connectDB = require('../middlewares/connectDB')
const router = express.Router()

/* GET users listing. */
router.get('/', connectDB, function (req, res, next) {
  res.send('respond with a resource' + 'oie')
})

module.exports = router
