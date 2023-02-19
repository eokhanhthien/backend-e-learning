const express = require('express');
const apifrontend = require('../controllers/api-frontend');

const route = express.Router()

route.get('/api/course-frontend', apifrontend.getAllcourse)
route.get('/api/course-frontend/:id', apifrontend.getcourseByid)
route.get('/api/lesson-frontend/:id', apifrontend.getAlllesson)


module.exports = route;