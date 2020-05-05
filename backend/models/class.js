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
          type: mongoose.Types.ObjectId,
          ref: 'users'
        },
        cl: {
          type: mongoose.Types.ObjectId,
          ref: 'classes'

        },
        name: {
          type: String
        },
        email: {
          type: String
        },
        lastname: {
          type: String
        },
        phonenumber: {
          type: String,
        }


      }

      ],

     Presents:[
          {

             teacherid:{
                type: Schema.Types.ObjectId,
                ref: 'users'
                   },

             teachername:{
             type:String
               },
            teacherlastname:{
              type:String
            },
             date: {
               type: Date,
               required: true,
               default:Date.now()
                 },
            Usersp: [
              {
                user: {
                  type: mongoose.Types.ObjectId,
                  ref: 'users'
                 },
                cl: {
                  type: mongoose.Types.ObjectId,
                  ref: 'classes'

                },
                name: {
                  type: String
                 },
                email: {
                  type: String
                 },
                lastname: {
                  type: String
                 }

              }

            ],

          }

       ]



});


const Class = mongoose.model('classes', classmodel);
module.exports = Class;
