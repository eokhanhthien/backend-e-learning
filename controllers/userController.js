const UserModel = require('../models/user.model');

const userController = {
    createUser:   async (req,res)=>{
        try {
            const body = req.body;
            const {name, email} = body;
            const user = new UserModel({name, email});
            // console.log(user);
            await user.save();
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

    editUser:   async (req,res)=>{
        try {
            const {id} = req.params;
            const {name, email} = req.body;
            await UserModel.findByIdAndUpdate(id, {name, email})


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

    deleteUser:   async (req,res)=>{
        try {
            const {id} = req.params;
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
    }
}

module.exports = userController