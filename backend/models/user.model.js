const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
    },
    borndate: {
        type: Date
    },
    bornplace: {
        type: String
    },
    Firstname: {
        type: String
    },
    Lastname: {
        type: String,
    },

    role: {
        type: String
    },
    avatar: {
        type: String
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },



    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },

    quizzexist: {
        type: Boolean,
        default: false
    },
    Quizzs: [
        {
            quiz: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Quizz"
            },
            score: {
                type: Number,
                default: 0
            }
        }
    ],
    note: {
        type: Number,
        default: 0
    },
    answered: {
        type: Number,
        default: 0

    }
    ,
    Classes: [
        {
            classe: {
                type: Schema.Types.ObjectId,
                ref: 'classes',
            },

            classename: {
                type: String
            },

        }
    ],Modules: [
        {
          modid: {
            type: Schema.Types.ObjectId,
            ref: 'Module',
          },
          name:{
            type:String
          }
        }
      ],
    ClassU:
    {
        cl: {
            type: Schema.Types.ObjectId,
            ref: 'classes',
        },
        classname: {
            type: String
        }
    }
    ,
    Questionbank:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },

})

userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};
userSchema.methods.validPassword = function (pwd) {
    return (this.password === pwd);
};
const User = mongoose.model('users', userSchema);
module.exports = User;
