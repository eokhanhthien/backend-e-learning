const express = require('express')
const route = express.Router()

const userRoute = require('./userRoute');
const languageRoute = require("./languageRoute");
const courseRoute = require("./courseRoute");
route.use(userRoute)
route.use(languageRoute)
route.use(courseRoute)


module.exports = route

