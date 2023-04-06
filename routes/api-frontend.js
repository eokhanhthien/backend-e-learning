const express = require('express');
const apifrontend = require('../controllers/api-frontend');

const route = express.Router()


// upload file len Cloud dinary 
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const path = require('path');
// Configuration 
cloudinary.config({
    cloud_name: "do6gi72zf",
    api_key: "715479992252473",
    api_secret: "iq2ohjzRm_164TFTzDLb6am3ngs"
  });
// Tạo một đối tượng CloudinaryStorage để lưu trữ tệp tin
const storage_cloudinary = new CloudinaryStorage({
    cloudinary: cloudinary,
    // folder: "your-folder-name",
    allowedFormats: ["jpg", "png", "jpeg", "gif"],
    // transformation: [{ width: 500, height: 500, crop: "limit" }],
    params: {
        folder : 'eLearning'
    }
   
  });
  

// ---------------------------------------------------------------------------------------------------------------------------------

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
const upload = multer({storage: storage_cloudinary}).single("image")

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