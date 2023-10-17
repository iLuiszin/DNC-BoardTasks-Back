const jwt = require('jsonwebtoken')
const errorHandler = require('../functions/errorHandler')

async function authUser(req, res, next) {
  const token = req.headers['x-auth-token']

  if (!token) {
    return errorHandler(res, new Error('Token not found!'))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userJwt = decoded

    next()
  } catch (error) {
    console.error(error)
    return errorHandler(res, new Error('Invalid token'))
  }
}

module.exports = authUser
