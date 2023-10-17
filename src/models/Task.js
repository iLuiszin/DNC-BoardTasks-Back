const mongoose = require('mongoose')
const { Schema } = mongoose

const Task = mongoose.model(
  'Task',
  new Schema(
    {
      position: {
        type: Number,
        required: 'é obrigatório!',
      },
      title: {
        type: String,
        required: 'é obrigatório!',
      },
      description: {
        type: String,
        default: '',
      },
      status: {
        type: String,
        required: 'é obrigatório!',
      },
      deliveryDate: {
        type: Date,
        default: null,
      },
      userCreator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'é obrigatório!',
      },
    },
    {
      timestamps: true,
    }
  )
)

module.exports = Task
