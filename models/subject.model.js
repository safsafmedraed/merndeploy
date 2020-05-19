const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectmodel = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    extra: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    Solved: {
        type: Boolean,
        default: false
    },
    rate: {
        type: Number
    },
    Comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }
    ]
    ,
    /*  users: {
          type: mongoose.Schema.Types.ObjectId, ref: 'User'
      },*/

});


const Subject = mongoose.model('subject', subjectmodel);
module.exports = Subject;