const mongoose = require('mongoose')

const QuizzSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    code : {
        type: String,
        required: true
    },
    classe :{
        type: String,
        required :true,
    },
    Question: [
        {
            description: {
                type: String,
                required: true
            },
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
            points : {
                type: Number,
                required: true
            },
            Correct : {
                type: String,
                require : true
            }
        }
    ],
    Timer : {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Quizz', QuizzSchema)