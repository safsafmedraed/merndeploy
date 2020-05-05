const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const presencemodel = new Schema({
  date: {
    type: Date,
    required: true,
    default:Date.now()
  },

  teacher: {
    teacherid: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    Firstname: {
      type: String
    },
    Lastname: {
      type: String,
    },
    email: {
      type: String,
    },
  },
     classe:{

       className:{
         type:String
          },

      },


  presents:[
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      cl: {
        type: Schema.Types.ObjectId,
        ref: 'classes'
      },
      Firstname: {
        type: String
      },
      Lastname: {
        type: String,
      },
      email: {
        type: String,
      },

    }
  ]


});


const Class = mongoose.model('presences', presencemodel);
module.exports = Class;
