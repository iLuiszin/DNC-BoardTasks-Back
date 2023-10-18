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
      const idTask = req.params.id
      const { position, title, description, status, deliveryDate } = req.body

      const loggedUser = req.userJwt.id

      const taskExists = await Task.findOne({
        _id: idTask,
        userCreator: loggedUser,
      })

      if (!taskExists) {
        return errorHandler(
          res,
          'Error: Task not found or you are not the creator!'
        )
      }

      const updatedTask = await Task.updateOne(
        { _id: idTask },
        {
          position,
          title,
          description,
          status,
          deliveryDate,
        }
      )

      if (updatedTask?.modifiedCount > 0) {
        const taskData = await Task.findOne({ _id: idTask }).populate(
          'userCreator'
        )

        return res.status(200).json({
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

  static async getAll(req, res) {
    // #swagger.tags = ['Task']
    // #swagger.description = "Endpoint to get all tasks from logged user."
    try {
      const idUser = req.userJwt.id

      const tasks = await Task.find({ userCreator: idUser }).populate(
        'userCreator'
      )

      return res.status(200).json({
        status: 'OK',
        message: 'Tasks found successfully!',
        answer: tasks,
      })
    } catch (error) {
      console.log(error)
      return errorHandler(res, error)
    }
  }
}
