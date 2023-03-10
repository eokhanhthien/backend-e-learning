const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const lessonDetailSchema = new Schema({
    id_lab: {type: String , require: true},
    content: {type: String , require: true},
    description: {type: String , require: true},
    image: [ String]
},{
    timestamps: true
});

module.exports = mongoose.model('LessonDetail', lessonDetailSchema)

