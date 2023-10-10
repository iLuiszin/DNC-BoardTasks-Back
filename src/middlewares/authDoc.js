async function authDocProduction(req, res, next) {
  const { password } = req.body

  // Usuário no servidor de dev

  if (req.headers.host.includes('localhost') || req.originalUrl !== '/doc/') {
    return next()
  }

  // Usuário digitou a senha correta
  if (password === process.env.SWAGGER_PASSWORD_DOC) {
    return next()
  }

  // Usuário digitou a senha incorreta
  if (password) {
    res.status(401).set('Content-Type', 'text/html')
    res.send(
      Buffer.from(`
      <form method="post">
        <p style="color: red">Senha incorreta!</p>
        <label for="password">Senha da documentação:</label>
        <input type="password" name="password" id="password" placeholder="Password"/>
        <button type="submit">Emtrar</button>
      </form>
      `)
    )
  } else {
    // Usuário ainda não digitou a senha e está em server de produção
    res.status(200).set('Content-Type', 'text/html')
    res.send(
      Buffer.from(`
      <form method="post">
        <label for="password">Senha da documentação:</label>
        <input type="password" name="password" id="password" placeholder="Password"/>
        <button type="submit">Emtrar</button>
      </form>
      `)
    )
  }
}

module.exports = authDocProduction
