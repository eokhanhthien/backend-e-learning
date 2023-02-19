const CourseModel = require('../models/course.model');
const LessonModel = require('../models/lesson.model');

const apifrontendController = {
    getAllcourse:   async (req,res)=>{
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
    getcourseByid:   async (req,res)=>{
        try {
            const {id} = req.params;
            const data = await CourseModel.findOne({_id:id})

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

    getAlllesson: async (req,res)=>{
        try {
            const {id} = req.params;
            const data = await LessonModel.find({id_course: id})
            
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
   
}

module.exports = apifrontendController