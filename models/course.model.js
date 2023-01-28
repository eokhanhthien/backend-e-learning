const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CourseSchema = new Schema({
    id_language: {type: String , require: true},
    name_language: {type: String , require: true},
    name: {type: String , require: true},
    level: {type: String , require: true},
    description: {type: String , require: true},
    image: {type: String , require: true},
},{
    timestamps: true
});

module.exports = mongoose.model('Course', CourseSchema)