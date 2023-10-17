const express = require('express')
const connectDB = require('../middlewares/connectDB')
const TaskController = require('../controllers/TaskController')
const authUser = require('../middlewares/authUser')
const router = express.Router()

router.post('/create', authUser, connectDB, TaskController.create)
router.post('/login', connectDB)

module.exports = router
