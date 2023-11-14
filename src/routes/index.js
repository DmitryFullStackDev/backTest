const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')

router.use('/firebase', userRouter)

module.exports = router
