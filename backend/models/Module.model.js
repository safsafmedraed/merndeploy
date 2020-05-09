const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ModuleModel = new Schema({
    
name: {
    type: String,
    required: true
},
Lessons: [{
    type: Schema.Types.ObjectId,
    ref: 'lesson',
    default: null
}]

})
module.exports = mongoose.model('Module', ModuleModel)