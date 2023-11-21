const express = require('express')
const router = express.Router()
const userController = require('../controlles/userController')

router.post('/createUser', userController.createUser)
router.post('/updateUser', userController.extendSubscription)

module.exports = router
