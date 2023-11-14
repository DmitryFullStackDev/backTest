const express = require('express')
const router = express.Router()
const userController = require('../controlles/userController')

router.get('/get', userController.getUser)

module.exports = router
