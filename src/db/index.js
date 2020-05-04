const config = require('./config')
const mysql = require('mysql')

module.exports = mysql.createPool(config)
