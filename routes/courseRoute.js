const express = require('express');
const courseController = require('../controllers/courseController');

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

route.get('/api/course', courseController.getAllCourse)
route.get('/api/course/:id', courseController.getrowCourse)
route.post('/api/course',upload, courseController.createCourse)
// route.post('/api/course/upload',upload ,courseController.uploadCourse)
route.put('/api/course/:id', courseController.editCourse)
route.delete('/api/course/:id', courseController.deleteCourse)

module.exports = route;