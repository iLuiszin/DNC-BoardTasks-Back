const express = require('express')
const connectDB = require('../middlewares/connectDB')
const errorHandler = require('../functions/errorHandler')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { default: mongoose } = require('mongoose')
const router = express.Router()

router.post('/create', connectDB, async (req, res, next) => {
  try {
    // #swagger.tags = ['User']
    const { name, email, password } = req.body
    const passwordHash = await bcrypt.hash(password, 10)

    const userExists = await User.findOne({ email: email })

    const BDresponse = await User.create({
      name,
      email,
      password: passwordHash,
    })

    return res.status(201).json({
      status: 'OK',
      message: 'User created successfully!',
      answer: BDresponse,
    })
  } catch (error) {
    if (String(error).includes('email_1 dup key')) {
      return errorHandler(res, 'Error: Email already exists!')
    }
    console.log(error)
    return errorHandler(res, error)
  }
})

module.exports = router
