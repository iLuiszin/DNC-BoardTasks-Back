const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const User = mongoose.model(
  'User',
  new Schema(
    {
      name: {
        type: String,
        required: 'é obrigatório!',
      },
      email: {
        type: String,
        required: 'é obrigatório!',
        unique: true,
        lowercase: true,
        index: true,
        validate: {
          validator: (value) => {
            return validator.isEmail(value)
          },
          message: 'inválido',
        },
      },
      password: {
        type: String,
        required: 'é obrigatório',
        select: false,
      },
    },
    {
      timestamps: true,
    }
  )
)

module.exports = User
