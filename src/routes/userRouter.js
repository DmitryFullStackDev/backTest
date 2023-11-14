const express = require('express')
const router = express.Router()
const userController = require('../controlles/userController')

router.post('/createUser', userController.createUser)
router.post('/test', userController.test)

module.exports = router
