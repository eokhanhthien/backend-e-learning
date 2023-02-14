const express = require('express');
const apifrontend = require('../controllers/api-frontend');

const route = express.Router()

route.get('/api/course-frontend', apifrontend.getAllcourse)


module.exports = route;