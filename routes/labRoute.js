const express = require('express');
const labController = require('../controllers/labController');

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
const upload = multer({storage: storage}).array("image",3)

route.get('/api/lab', labController.getAllLab)
route.get('/api/lab/:id', labController.getrowLab)
route.post('/api/lab',upload, labController.createLab)
// route.post('/api/lab/upload',upload ,labController.uploadLab)
route.put('/api/lab/:id',upload, labController.editLab)
route.delete('/api/lab/:id', labController.deleteLab)

module.exports = route;