const lessonModel = require('../models/lesson.model');
const LessonDetailModel = require('../models/lessonDetail.model');
let fs = require('fs');

const cloudinary = require('cloudinary').v2;

const labController = {
    getAllLab:   async (req,res)=>{
        try {
            const data = await lessonModel.find()

            return res.status(200).json({
                status: "Success",
                message: "Get data success !!!",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: "Fail",
                message: "Get data Fail !!!",
            })
        }
    },
    getrowLab:   async (req,res)=>{
        try {
            const {id} = req.params;
            const data = await lessonModel.findById(id)

            return res.status(200).json({
                status: "Success",
                message: "Get data success !!!",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: "Fail",
                message: "Get data Fail !!!",
            })
        }
    },
    getrowLabDetail:   async (req,res)=>{
        try {
            const {id} = req.params;
            const data = await LessonDetailModel.findOne({ id_lab : id });

            return res.status(200).json({
                status: "Success",
                message: "Get data success !!!",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: "Fail",
                message: "Get data Fail !!!",
            })
        }
    },

    createLab:   async (req,res)=>{
        try {
            const arr = [];
            const body = req.body;
            for (let index = 0; index < req.files.length; index++) { //NEW ONE
                arr.push(req.files[index].path);
              }
        //     const nameImage = req.file.filename;
            body.image = arr;
            content_lab = body.content;
            description_lab = body.description;
            const {name,id_course,name_course  } = body;
            const Lab = new lessonModel({name,id_course,name_course});
            Lab.save((error, course) => {
                if (error) {
                  console.error(error);
                  return;
                }
              const id_lab = course._id.toString()
              const image = arr
              const content = content_lab
              const description = description_lab
              const LabDetail = new LessonDetailModel({id_lab,content,description,image});
              LabDetail.save();
                console.log('Course added with _id:', course._id.toString());
              });

            return res.status(200).json({
                status: "Success",
                message: "Create data success !!!",
            });
        } catch (error) {
            return res.status(500).json({
                status: "Fail",
                message: "Create data Fail !!!",
            })
        }

        // console.log(body);
        // console.log(req.body);
    },

    editLab:   async (req,res)=>{

        try {
            const {id} = req.params;
            let arr = [];
            const body = req.body;
            console.log(body)
            // arr = req.body.old_image.split(', ') // chuyen chuoi thanh
            const old_image = req.body.old_image;
            const old_image_array = old_image.split(',');
            // console.log(typeof old_image_array);
            // console.log(old_image_array);
          
 
            if(req.files.length >0){
                for (let index = 0; index < req.files.length; index++) { //NEW ONE
                    arr.push(req.files[index].path);
                  }
                try {
                    const array_filename = [];
                    for(let i = 0 ; i< old_image_array.length ; i++){
                        //trong sourcode
                        // fs.unlinkSync('../../Vuejs/e-learning/src/assets/images/'+old_image_array[i]);

                        // console.log(req.body.old_image)
                        const cloudinaryUrl = cloudinary.url(old_image_array[i], { type: 'upload' });
                        array_filename.push(cloudinaryUrl.split('/').pop().split('.')[0]);

                    }
                    // console.log(array_filename)
                    array_filename.forEach(async (item) =>{
                        await cloudinary.uploader.destroy('eLearning/'+item);

                    })
                    
                } catch (error) {
                    console.log(error);
                }
              
            }else{
                arr = old_image_array;
            
            }
            // console.log(arr);

            content_lab = body.content;
            description_lab = body.description;
            // console.log(body);
            const {name,id_course,name_course  } = body;
            await lessonModel.findByIdAndUpdate(id, { name: body.name, id_course: body.id_course, name_course: body.name_course });
          
              const id_lab = id
              const image = arr
              const content = content_lab
              const description = description_lab
              await LessonDetailModel.findOneAndUpdate({id_lab : id},{id_lab,content,description,image});
             
            
            //   });

            return res.status(200).json({
                status: "Success",
                message: "Create data success !!!",
            });
        } catch (error) {
            return res.status(500).json({
                status: "Fail",
                message: "Create data Fail !!!",
            })
        }
    },

    deleteLab:   async (req,res)=>{
        try {
            const {id} = req.params;
            const result =  await lessonModel.findByIdAndDelete(id)
            // console.log(id);
            if(result){  
                    const resultDetail = await LessonDetailModel.findOneAndDelete({ id_lab : id });
                    if(resultDetail.image != ''){
                        try {  
                            const array_filename = [];
                            for(let i =0 ; i< resultDetail.image.length ; i++){
                            // anh trong sourcode 
                            // fs.unlinkSync('../../Vuejs/e-learning/src/assets/images/'+ resultDetail.image[i]);

                            const cloudinaryUrl = cloudinary.url(resultDetail.image[i], { type: 'upload' });
                            array_filename.push(cloudinaryUrl.split('/').pop().split('.')[0]);
                            } 
                            array_filename.forEach(async (item) =>{
                                await cloudinary.uploader.destroy('eLearning/'+item);
        
                            })
                        } catch (error) {
                            console.log(error);
                        }
                    }                
            }



            res.status(200).json({
                status: "Success",
                message: "Delete data success !!!",
            });
        } catch (error) {
            res.status(500).json({
                status: "Fail",
                message: "Delete data Fail !!!",
            })
        }
    },

    uploadLab: async (req,res)=>{
        try {
            console.log("dang vao day")
            

            res.json({file: req.file})
            // res.status(200).json({
            //     status: "Success",
            //     message: "Upload data success !!!",
            // });
        } catch (error) {
            res.status(500).json({
                status: "Fail",
                message: "Upload data Fail !!!",
            })
        }
    }
}

module.exports = labController