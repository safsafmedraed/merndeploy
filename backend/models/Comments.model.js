const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentModel = new Schema({
    comment: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    userResponse: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

})



const Comment = mongoose.model('Comment', CommentModel);
module.exports = Comment;