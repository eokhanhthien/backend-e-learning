const LanguageModel = require('../models/language.model');

const languageController = {
    getAllLanguage:   async (req,res)=>{
        try {
            const data = await LanguageModel.find()

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
    getrowLanguage:   async (req,res)=>{
        try {
            const {id} = req.params;
            const data = await LanguageModel.findById(id)

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

    createLanguage:   async (req,res)=>{
        try {
            const body = req.body;
            const {name} = body;
            const Language = new LanguageModel({name});
            // console.log(Language);
            await Language.save();
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

    editLanguage:   async (req,res)=>{
        try {
            const {id} = req.params;
            const {name} = req.body;
            await LanguageModel.findByIdAndUpdate(id, {name})


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

    deleteLanguage:   async (req,res)=>{
        try {
            const {id} = req.params;
            await LanguageModel.findByIdAndDelete(id)


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

module.exports = languageController