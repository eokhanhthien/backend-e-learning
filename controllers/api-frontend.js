const CourseModel = require('../models/course.model');

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
   
}

module.exports = apifrontendController