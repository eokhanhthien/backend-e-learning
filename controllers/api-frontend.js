const CourseModel = require('../models/course.model');
const LessonModel = require('../models/lesson.model');
const UserModel = require('../models/user.model');
const EnrollmentModel = require('../models/enrollment.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    signup: async (req, res) => {
        const post = req.body.post;
        // console.log(post.name)
        try {

            const hashpassword = await bcrypt.hash(post.password, 1);
            const user = new UserModel({ name: post.name, email: post.email, password: hashpassword, role: post.role, image: post.image });
            await user.save();
            return res.status(200).json({
                status: "Success",
                message: "Signup success !!!",
                user,

            });
        } catch (error) {
            return res.status(500).json({
                status: "Fail",
                message: "Signup Fail !!!",
            })
        }
    },

    login: async (req, res) => {
        const post = req.body;
        // console.log(post.email);
        try {
            const user = await UserModel.findOne({ email: post.email });
            // console.log(post.password);
            // console.log(user.role);
            if (!user || user.role == '1') {
                return res.status(401).json({
                    status: "Fail",
                    message: "No user found with this email",
                });
            }
            const isMatch = await bcrypt.compare(post.password, user.password);
            // console.log(isMatch);
            if (!isMatch) {
                return res.status(401).json({
                    status: "Fail",
                    message: "Incorrect password",
                });
            }
            const token = jwt.sign({ _id: user._id.toString() }, 'secretKey_User', { expiresIn: '1200s' });
            // localStorage.setItem("token", token );
            return res.status(200).json({ user, token });
        } catch (error) {
            // console.log(error);
            return res.status(500).json({
                status: "Fail",
                message: "Server error",
            });
        }
    },

    get_join_course:   async (req,res)=>{
     
        try {
            const {id_user, id_course} = req.body;
            const data = await EnrollmentModel.findOne({ id_user, id_course });

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


    add_join_course: async (req, res) => {
        try {
            const {id_user, id_course} = req.body;
            const data = await  new EnrollmentModel({ id_user, id_course });
            await data.save();
            return res.status(200).json({
                status: "Success",
                message: "Create data success !!!",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: "Fail",
                message: "Create data Fail !!!",
            })
        }
    },
    
}

module.exports = apifrontendController