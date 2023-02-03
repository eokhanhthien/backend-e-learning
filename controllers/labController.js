const LabModel = require('../models/lab.model');
const LabDetailModel = require('../models/labDetail.model');
let fs = require('fs');


const labController = {
    getAllLab:   async (req,res)=>{
        try {
            const data = await LabModel.find()

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
            const data = await LabModel.findById(id)

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
            const data = await LabDetailModel.findOne({ id_lab : id });

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
                arr.push(req.files[index].filename);
              }
        //     const nameImage = req.file.filename;
            body.image = arr;
            content_lab = body.content;
            description_lab = body.description;
            const {name,id_course,name_course  } = body;
            const Lab = new LabModel({name,id_course,name_course});
            Lab.save((error, course) => {
                if (error) {
                  console.error(error);
                  return;
                }
              const id_lab = course._id.toString()
              const image = arr
              const content = content_lab
              const description = description_lab
              const LabDetail = new LabDetailModel({id_lab,content,description,image});
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
            // const post = req.body;
            // console.log(post);
            let new_image = '';
            if(req.file){
                new_image = req.file.filename;
                try {
                    fs.unlinkSync('../../Vuejs/e-learning/src/assets/images/'+req.body.old_image);
                    
                } catch (error) {
                    console.log(error);
                }
            }else{
                new_image = req.body.old_image;
            }
            const newPost = req.body;
            newPost.image = new_image;
            // console.log(req.body);
            // console.log(res.file.filename);
            // const {name,id_language,level,name_language,description, image } = newPost;
           

            await LabModel.findByIdAndUpdate(id,newPost)


            res.status(200).json({
                status: "Success",
                message: "Edit data success !!!",
            });
        } catch (error) {
            res.status(500).json({
                status: "Fail",
                message: "Edit data Fail !!!",
            })
        }
    },

    deleteLab:   async (req,res)=>{
        try {
            const {id} = req.params;
            const result =  await LabModel.findByIdAndDelete(id)
            console.log(id);
            if(result){  
                    const resultDetail = await LabDetailModel.findOneAndDelete({ id_lab : id });
                    if(resultDetail.image != ''){
                        try {   
                            for(let i =0 ; i< resultDetail.image.length ; i++){
                                fs.unlinkSync('../../Vuejs/e-learning/src/assets/images/'+ resultDetail.image[i]);
                            } 
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