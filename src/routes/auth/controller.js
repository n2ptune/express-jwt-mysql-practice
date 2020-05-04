const { createUser, verifyUser } = require('../../models/user/index')

exports.signUp = (req, res) => {
  const { email, pw } = req.body

  createUser(email, pw, (result, isError) => {
    if (isError) {
      res.status(500).end()
    } else if (result) {
      res.status(200).end()
    }
  })
}

exports.signIn = (req, res) => {
  const { email, pw } = req.body

  verifyUser(email, pw, (token, err) => {
    if (err || !token) {
      res.status(500).send(err.message)
    } else if (token) {
      res.set('Content-Type', 'application/json')
      res.status(200).send(token)
    }
  })
}
