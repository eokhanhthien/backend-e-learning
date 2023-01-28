const CourseModel = require('../models/course.model');



const courseController = {
    getAllCourse:   async (req,res)=>{
        try {
            const data = await CourseModel.find()

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
    getrowCourse:   async (req,res)=>{
        try {
            const {id} = req.params;
            const data = await CourseModel.findById(id)

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

    createCourse:   async (req,res)=>{
        try {
            const body = req.body;
            const nameImage = req.file.filename;
            body.image = nameImage;
            const {name,id_language,level,name_language,description, image } = body;
            const Course = new CourseModel({name,id_language,level,name_language,description, image});
            await Course.save();
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

    editCourse:   async (req,res)=>{
        try {
            const {id} = req.params;
            const {name} = req.body;
            await CourseModel.findByIdAndUpdate(id, {name})


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

    deleteCourse:   async (req,res)=>{
        try {
            const {id} = req.params;
            await CourseModel.findByIdAndDelete(id)


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

    uploadCourse: async (req,res)=>{
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

module.exports = courseController