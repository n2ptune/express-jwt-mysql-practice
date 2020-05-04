const db = require('../../db/index')

module.exports = (email, pw, cb) => {
  db.query(
    'SELECT count(*) FROM TEST_USER WHERE email = ?',
    [email],
    (err, result) => {
      if (err) {
        console.error(err)
        throw err
      } else {
        if (result[0]['count(*)'] === 0) {
          db.query(
            'INSERT INTO TEST_USER (email, password, token) VALUES(?, SHA1(?), null)',
            [email, pw],
            (err, result) => {
              if (err) {
                console.error(err)
                throw err
              }
              cb(result, false)
            }
          )
        } else {
          cb(null, true)
        }
      }
    }
  )
}
