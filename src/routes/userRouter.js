const express = require('express')
const router = express.Router()
const userController = require('../controlles/userController')

router.post('/createUser', userController.createUser)
router.post('/extendSubscription', userController.extendSubscription)

module.exports = router
