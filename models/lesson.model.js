const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const LessonSchema = new Schema({
    id_course: {type: String , require: true},
    name_course: {type: String , require: true},
    name: {type: String , require: true},
    // content: {type: String , require: true},
    // description: {type: String , require: true},
    // image: [ String]
},{
    timestamps: true
});

module.exports = mongoose.model('Lesson', LessonSchema)