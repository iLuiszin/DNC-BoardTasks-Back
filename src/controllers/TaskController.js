const errorHandler = require('../functions/errorHandler')
const Task = require('../models/Task')

module.exports = class TaskController {
  static async create(req, res) {
    try {
      // #swagger.tags = ['Task']
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
}
