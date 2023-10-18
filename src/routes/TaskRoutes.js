const express = require('express')
const connectDB = require('../middlewares/connectDB')
const TaskController = require('../controllers/TaskController')
const authUser = require('../middlewares/authUser')
const router = express.Router()

router.post('/create', authUser, connectDB, TaskController.create)

router.put('/update/:id', authUser, connectDB, TaskController.update)
router.get('/list', authUser, connectDB, TaskController.getAll)
router.delete('/delete/:id', authUser, connectDB, TaskController.delete)

module.exports = router
