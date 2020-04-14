const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const presencemodel = new Schema({
  date: {
    type: Date,
    required: true,
    default:Date.now()
  },

  classe:{
    name: {
      type: String,
      required: true
    },

    Users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    ]

  },

  presents:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  ]



});


const Class = mongoose.model('presences', presencemodel);
module.exports = Class;
