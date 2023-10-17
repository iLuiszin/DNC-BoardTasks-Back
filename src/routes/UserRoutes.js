const express = require('express')
const connectDB = require('../middlewares/connectDB')
const UserController = require('../controllers/UserController')
const authUser = require('../middlewares/authUser')
const router = express.Router()

router.post('/create', connectDB, UserController.create)
router.post('/login', connectDB, UserController.login)

module.exports = router
