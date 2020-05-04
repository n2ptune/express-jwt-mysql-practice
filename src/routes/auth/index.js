const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.post('/sign-up', controller.signUp)
router.post('/sign-in', controller.signIn)

module.exports = router
