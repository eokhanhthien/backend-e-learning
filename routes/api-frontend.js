const express = require('express');
const apifrontend = require('../controllers/api-frontend');

const route = express.Router()

// const secretKey = 'secretKey_User';
// const authenticate = async (req, res, next) => {
//     const token = req.header('x-auth-token');
//     // console.log(token);
//     if (!token) {
//       return res.status(401).json({
//         message: "No token, authorization denied",
//       });
//     }
//     try {
//       const decoded = jwt.verify(token, secretKey);
//       req.user = decoded;
//       next();
//     } catch (error) {
//       res.status(400).json({
//         message: "Token is not valid",
//         code: 400
//       });
//     }
//   };

// upload image
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        // cb(null,'./uploads');
        cb(null,'../../Vuejs/e-learning/src/assets/images');
    },
    filename: function(req,file, cb){
        // cb(null,file.originalname);
        cb(null, Date.now()+'.jpg');
    }
})
const upload = multer({storage: storage}).single("image")

route.get('/api/course-frontend', apifrontend.getAllcourse)
route.get('/api/course-frontend/:id', apifrontend.getcourseByid)
route.get('/api/lesson-frontend/:id', apifrontend.getAlllesson)
route.get('/api/lesson-detail-frontend/:id', apifrontend.getDetaillesson)

route.post('/api/user-frontend/signup', apifrontend.signup)
route.post('/api/user-frontend/login', apifrontend.login)
route.post('/api/user-frontend/changeinfo',upload, apifrontend.changeinfo)
route.post('/api/user-frontend/add-join-course', apifrontend.add_join_course)
route.post('/api/user-frontend/get-join-course', apifrontend.get_join_course)
module.exports = route;