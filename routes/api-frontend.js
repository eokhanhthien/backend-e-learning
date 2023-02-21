const express = require('express');
const apifrontend = require('../controllers/api-frontend');

const route = express.Router()

const secretKey = 'secretKey_User';
const authenticate = async (req, res, next) => {
    const token = req.header('x-auth-token');
    // console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({
        message: "Token is not valid",
        code: 400
      });
    }
  };

route.get('/api/course-frontend', apifrontend.getAllcourse)
route.get('/api/course-frontend/:id', apifrontend.getcourseByid)
route.get('/api/lesson-frontend/:id', apifrontend.getAlllesson)

route.post('/api/user-frontend/signup', apifrontend.signup)
route.post('/api/user-frontend/login', apifrontend.login)
module.exports = route;