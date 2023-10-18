const errorHandler = require('../functions/errorHandler')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = class UserController {
  static async create(req, res) {
    // #swagger.tags = ['User']
    try {
      const { name, email, password } = req.body
      const passwordHash = await bcrypt.hash(password, 10)

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
  }

  static async login(req, res) {
    // #swagger.tags = ['User']
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email: email }).select('+password')

      if (!user) {
        return errorHandler(res, 'Error: Email or password invalid!')
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return errorHandler(res, 'Error: Email or password invalid!')
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      })

      res.header('x-auth-token', token)
      res.status(200).json({
        status: 'OK',
        message: 'User logged in successfully!',
        answer: { 'x-auth-token': token },
      })
    } catch (error) {
      if (String(error).includes('email_1 dup key')) {
        return errorHandler(res, 'Error: Email already exists!')
      }
      console.log(error)
      return errorHandler(res, error)
    }
  }
}
