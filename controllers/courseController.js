const CourseModel = require('../models/course.model');
let fs = require('fs');

const cloudinary = require('cloudinary').v2;

const courseController = {
    getAllCourse: async (req, res) => {
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
    getrowCourse: async (req, res) => {
        try {
            const { id } = req.params;
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

    createCourse: async (req, res) => {
        // console.log(req.file)
        try {
            const body = req.body;
            const nameImage = req.file.path;
            body.image = nameImage;
            const { name, id_language, level, name_language, description, image } = body;
            const Course = new CourseModel({ name, id_language, level, name_language, description, image });
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

    editCourse: async (req, res) => {

        try {
            const { id } = req.params;
            // const post = req.body;
            // console.log(post);
            let new_image = '';
            if (req.file) {
                new_image = req.file.path;
                try {
                    //trong sourcode
                    // fs.unlinkSync('../../Vuejs/e-learning/src/assets/images/'+req.body.old_image);
                    const cloudinaryUrl = cloudinary.url(req.body.old_image, { type: 'upload' });
                    const publicId = cloudinaryUrl.split('/').pop().split('.')[0];

                    console.log(publicId);
                    await cloudinary.uploader.destroy('eLearning/'+publicId );
                } catch (error) {
                    console.log(error);
                }
            } else {
                new_image = req.body.old_image;
            }
            const newPost = req.body;
            newPost.image = new_image;
            // console.log(req.body);
            // console.log(res.file.filename);
            // const {name,id_language,level,name_language,description, image } = newPost;


            await CourseModel.findByIdAndUpdate(id, newPost)


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

    deleteCourse: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await CourseModel.findByIdAndDelete(id)
            if (result.image != '') {
                try {
                    // fs.unlinkSync('../../Vuejs/e-learning/src/assets/images/' + result.image);

                    const cloudinaryUrl = cloudinary.url(result.image, { type: 'upload' });
                    const publicId = cloudinaryUrl.split('/').pop().split('.')[0];

                    // console.log(publicId);
                    await cloudinary.uploader.destroy('eLearning/'+publicId );

                } catch (error) {
                    console.log(error);
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

    uploadCourse: async (req, res) => {
        try {
            console.log("dang vao day")


            res.json({ file: req.file })
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