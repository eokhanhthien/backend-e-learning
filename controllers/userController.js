const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    signup: async (req, res) => {
        const post = req.body;
        console.log(post)
        try {

            const hashpassword = await bcrypt.hash(req.body.password, 1);
            const user = new UserModel({ name: req.body.name, email: req.body.email, password: hashpassword, role: req.body.role });
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
        // console.log(req.body);
        try {
            const user = await UserModel.findOne({ email: req.body.email });
            // console.log(req.body.password);
            // console.log(user);
            if (!user) {
                return res.status(401).json({
                    status: "Fail",
                    message: "No user found with this email",
                });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            // console.log(isMatch);
            if (!isMatch) {
                return res.status(401).json({
                    status: "Fail",
                    message: "Incorrect password",
                });
            }
            const token = jwt.sign({ _id: user._id.toString() }, 'secretKey', { expiresIn: '14400s' });
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

    editUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            await UserModel.findByIdAndUpdate(id, { name, email })


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

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            await UserModel.findByIdAndDelete(id)


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
}

module.exports = userController