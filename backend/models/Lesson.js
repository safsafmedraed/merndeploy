const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonModel = new Schema({

  name: {
    type: String,
    required : true
  },

  date : {
    type: Date,
    required : true,
    default: Date.now()
  },

  Quizzs: [{
    type: Schema.Types.ObjectId,
    ref: 'Quizz',
    default: null
  }],

  Questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question',
    default: null
  }]

})
module.exports = mongoose.model('lesson', lessonModel)
