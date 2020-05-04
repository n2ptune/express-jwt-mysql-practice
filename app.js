const express = require('express')
const morgan = require('morgan')
const app = express()

require('dotenv').config()

app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

const authRouter = require('./src/routes/auth/index')

app.use('/auth', authRouter)

app.listen(3000, () => console.log('start'))
