const express = require('express');
const labController = require('../controllers/labController');

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
const upload = multer({storage: storage_cloudinary}).array("image",3)

route.get('/api/lab', labController.getAllLab)
route.get('/api/lab/:id', labController.getrowLab)
route.get('/api/labdetail/:id', labController.getrowLabDetail)
route.post('/api/lab',upload, labController.createLab)
// route.post('/api/lab/upload',upload ,labController.uploadLab)
route.put('/api/lab/:id',upload, labController.editLab)
route.delete('/api/lab/:id', labController.deleteLab)

module.exports = route;