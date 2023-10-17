function routes(app) {
  app.use('/users', require('./routes/UserRoutes.js'))
  return
}

module.exports = routes
