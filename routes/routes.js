const express = require('express')
const userRoute = require('./user.route')
const transactionRoute = require('./transaction.route')
const morgan = require('morgan')

// version 1 
const v1 = express.Router()
v1.use(morgan('dev'));
v1.use('/', [userRoute, transactionRoute])

const router = express.Router()
router.use('/api/v1', v1)

module.exports = router