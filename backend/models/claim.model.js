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
    responseDate : {
        type: Date
    },
    date: {
        type: Date,
        default: Date.now
    },
    Solved: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }


});


var claim = mongoose.model('claims',claimSchema);
module.exports=claim;