var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var claimSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    response: {
        type: String,
        default: ""
    },
    dateResponse : {
        type: Date
    },
    date: {
        type: Date,
        default: Date.now
    },
    solved: {
        type: Boolean,
        default: false
    },
    removed: {
        type: Boolean,
        default: false
    },
    admin:{
        type : mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
        required : true
    },
    processed :{
        type: Boolean,
        default: false
    }
});


var claim = mongoose.model('claims',claimSchema);
module.exports=claim;