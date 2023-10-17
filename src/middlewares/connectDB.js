const mongoose = require('mongoose')
const errorHandler = require('../functions/errorHandler')

const connectDB = async (req = null, res = null, next = null) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('conectado ao banco de dados')

    try {
      next()
    } catch {}

    return mongoose
  } catch (error) {
    console.log(error)
    errorHandler(res, 'Error: Erro ao conectar ao banco de dados')
    return error
  }
}

module.exports = connectDB
