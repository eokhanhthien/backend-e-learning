const CourseModel = require('../models/course.model');
const LessonDetailModel = require('../models/lessonDetail.model');
const LessonModel = require('../models/lesson.model');
const UserModel = require('../models/user.model');
const EnrollmentModel = require('../models/enrollment.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const _ = require('lodash');

let fs = require('fs');

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

    getDetaillesson: async (req,res)=>{
        try {
            const {id} = req.params;
            const data = await LessonDetailModel.findOne({id_lab: id})
            
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
            const userAvailable = await UserModel.findOne({ email: post.email });
            if(userAvailable){
                return res.status(500).json({
                    status: "Fail",
                    message: "Signup Fail user available!!!",
                }) 
            }else{
                const hashpassword = await bcrypt.hash(post.password, 1);
                const user = new UserModel({ name: post.name, email: post.email, password: hashpassword, role: post.role, image: post.image ,city: post.city, district: post.district, ward: post.ward, phonenumber: post.phonenumber, birthday: post.birthday,sex:post.sex });
                await user.save();
                return res.status(200).json({
                    status: "Success",
                    message: "Signup success !!!",
                    user,
    
                });
            }

        } catch (error) {
            return res.status(500).json({
                status: "Fail",
                message: "Signup Fail !!!",
            })
        }
    },
    changeinfo: async (req, res) => {
        const post = req.body;
        const id =  post._id;
        console.log(post)
        console.log(req.file)
        try {
            let new_image = '';
            if(req.file){
                new_image = req.file.filename;
                try {
                    if(req.body.old_image != 'user-default.png'){
                        fs.unlinkSync('../../Vuejs/e-learning/src/assets/images/'+req.body.old_image);
                    }
                    
                } catch (error) {
                    console.log(error);
                }
            }else{
                new_image = req.body.old_image;
            }
            const newPost = req.body;
            newPost.image = new_image;


             await UserModel.findByIdAndUpdate({_id:id}, newPost);
       
            return res.status(200).json({
                status: "Success",
                message: "Change info success !!!",
            });
        } catch (error) {
            return res.status(500).json({
                status: "Fail",
                message: "Change info Fail !!!",
            })
        }
    },

    changepassword: async (req, res) => {
        const post = req.body.post;
        const id =  post.idUser;
        // console.log(post)
        // console.log(req.file)
        try {
           const user = await UserModel.findById({_id:id});
        //    console.log(post.old_password)
           if(user){
            const isMatch = await bcrypt.compare(post.old_password, user.password);
            // console.log(isMatch)
            if(isMatch){
                const hashpassword = await bcrypt.hash(post.new_password, 1);
                // console.log(hashpassword)
                await UserModel.findByIdAndUpdate({_id:id}, {password : hashpassword});

                return res.status(200).json({
                    status: "Success",
                    message: "Change password success !!!",
                    user,
    
                });
            }else{
                res.status(500).json({
                    status: "Fail",
                    message: "Edit data Fail !!!",
                })
            }
           }

        } catch (error) {
            res.status(500).json({
                status: "Fail",
                message: "Edit data Fail !!!",
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
            // Trừ trường password và _id ra
            const sanitizedUser = _.omit(user.toObject(), ['password',]);
            return res.status(200).json({ user: sanitizedUser, token });

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