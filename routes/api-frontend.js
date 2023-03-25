const express = require('express');
const apifrontend = require('../controllers/api-frontend');

const route = express.Router()



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
route.get('/api/mycourse-frontend/:id', apifrontend.getMycourse)
route.get('/api/course-frontend/:id', apifrontend.getcourseByid)
route.get('/api/lesson-frontend/:id', apifrontend.getAlllesson)
route.get('/api/lesson-detail-frontend/:id', apifrontend.getDetaillesson)

route.post('/api/user-frontend/signup', apifrontend.signup)
route.post('/api/user-frontend/login', apifrontend.login)
route.post('/api/user-frontend/changeinfo',upload, apifrontend.changeinfo)
route.post('/api/user-frontend/changepassword',upload, apifrontend.changepassword)
route.post('/api/user-frontend/get-user',upload, apifrontend.getUser)
route.post('/api/user-frontend/add-join-course', apifrontend.add_join_course)
route.post('/api/user-frontend/get-join-course', apifrontend.get_join_course)
module.exports = route;