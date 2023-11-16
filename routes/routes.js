const express = require('express')
const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const morgan = require('morgan')

// version 1 
const v1 = express.Router()
v1.use(morgan('dev'));
v1.use('/', [userRoute, authRoute])

const router = express.Router()
router.use('/api/v1', v1)

module.exports = router