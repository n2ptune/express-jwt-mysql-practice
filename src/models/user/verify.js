const db = require('../../db/index')
const jwt = require('jsonwebtoken')

function updateToken(email, pw, token) {
  const sql =
    'UPDATE TEST_USER SET token = ? WHERE email = ? AND password = SHA1(?)'

  db.query(sql, [token, email, pw], (err, result) => {
    if (err) {
      throw err
    }
  })
}

module.exports = (email, pw, cb) => {
  const sql = 'SELECT * FROM TEST_USER WHERE email = ? AND password = SHA1(?)'

  db.query(sql, [email, pw], (err, result) => {
    if (err) {
      console.error(err)
      throw err
    } else {
      if (result.length) {
        const user = result[0]
        let token = null

        if (user.token) {
          jwt.verify(user.token, 'catdog', (err, decoded) => {
            if (err) {
              token = jwt.sign({ email: user.email }, 'catdog', {
                expiresIn: '30s'
              })
            } else {
              token = user.token
            }
          })
        } else {
          token = jwt.sign({ email: user.email }, 'catdog', {
            expiresIn: '30s'
          })
        }

        updateToken(email, pw, token)

        cb(token, null)
      } else {
        cb(null, new Error('no account'))
      }
    }
  })
}
