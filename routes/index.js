const express = require('express')
const route = express.Router()

const userRoute = require('./userRoute');

route.use(userRoute)


module.exports = route

