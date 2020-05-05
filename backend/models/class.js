const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classmodel = new Schema({
  name: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  Users:
    [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
      }
      ]



});


const Class = mongoose.model('classes', classmodel);
module.exports = Class;
