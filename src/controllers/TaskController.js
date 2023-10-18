const errorHandler = require('../functions/errorHandler')
const Task = require('../models/Task')

module.exports = class TaskController {
  static async create(req, res) {
    // #swagger.tags = ['Task']
    try {
      const { position, title, description, status, deliveryDate } = req.body

      const userCreator = req.userJwt.id

      const BDresponse = await Task.create({
        position,
        title,
        description,
        status,
        deliveryDate,
        userCreator,
      })

      return res.status(201).json({
        status: 'OK',
        message: 'Task created successfully!',
        answer: BDresponse,
      })
    } catch (error) {
      console.log(error)
      return errorHandler(res, error)
    }
  }

  static async update(req, res) {
    // #swagger.tags = ['Task']
    try {
      const idTarefa = req.params.id
      const { position, title, description, status, deliveryDate } = req.body

      const loggedUser = req.userJwt.id

      const taskExists = await Task.findOne({
        _id: idTarefa,
        userCreator: loggedUser,
      })

      if (!taskExists) {
        return errorHandler(
          res,
          'Error: Task not found or you are not the creator!'
        )
      }

      const updatedTask = await Task.updateOne(
        { _id: idTarefa },
        {
          position,
          title,
          description,
          status,
          deliveryDate,
        }
      )

      if (updatedTask?.modifiedCount > 0) {
        const taskData = await Task.findOne({ _id: idTarefa }).populate(
          'userCreator'
        )

        return res.status(201).json({
          status: 'OK',
          message: 'Task updated successfully!',
          answer: taskData,
        })
      }
    } catch (error) {
      console.log(error)
      return errorHandler(res, error)
    }
  }
}
