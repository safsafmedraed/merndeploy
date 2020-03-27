const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    education: [
        {
            school: {
                type: String,

            },
            degree: {
                type: String,

            },
            fieldofstudy: {
                type: String,

            },
            from: {
                type: Date,

            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ]






})







const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;