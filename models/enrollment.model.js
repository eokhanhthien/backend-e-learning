const mongoose = require('mongoose');


const enrollmentSchema = new mongoose.Schema({
  id_user: {
    type: String,
    required: true
  },
  id_course: {
    type: String,
    required: true
  },

});



module.exports = mongoose.model('Enrollment', enrollmentSchema);

