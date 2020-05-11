const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    description: String,
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ],
    points: Number,
    Correct: String,
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        default: null

    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',

    }
})

module.exports = mongoose.model('Question', QuestionSchema)