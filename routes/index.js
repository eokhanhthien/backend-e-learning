const express = require('express')
const route = express.Router()

const userRoute = require('./userRoute');
const languageRoute = require("./languageRoute");
const courseRoute = require("./courseRoute");
const labRoute = require("./labRoute");
route.use(userRoute)
route.use(languageRoute)
route.use(courseRoute)
route.use(labRoute)


module.exports = route

