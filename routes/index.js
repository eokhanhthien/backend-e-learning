const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken');

const userRoute = require('./userRoute');
const languageRoute = require("./languageRoute");
const courseRoute = require("./courseRoute");
const labRoute = require("./labRoute");
const fontendApi = require("./api-frontend");


const secretKey = 'secretKey';


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

route.use(userRoute)
route.use(fontendApi)
route.use(authenticate)
route.use(languageRoute,authenticate)
route.use(labRoute,authenticate)
route.use(courseRoute,authenticate)




module.exports = route

