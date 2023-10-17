function routes(app) {
  app.use('/users', require('./routes/UserRoutes.js'))
  app.use('/tasks', require('./routes/TaskRoutes.js'))
  return
}

module.exports = routes
