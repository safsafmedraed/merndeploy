const express = require('express')
const router = express.Router()
let Question = require('../models/Questions');
let User = require('../models/user.model');
let Lesson = require('../models/Lesson');
// get all quiz questions
router.get('/questions', (req, res) => {
    Question.find()
    .then(questions => res.json(questions))
    .catch(err=> res.status(400).json('error:'+err));
})

// get one quiz question
router.get('/questions/:id', (req, res) => {
    Question.findById(req.params.id)
    .then(questions => res.json(questions))
    .catch(err => res.status(400).json('Error: ' + err));
})
router.get('/questionbym/:id',(req, res)=> {
    Question.find({module : req.params.id})
    .then(questions=> res.json(questions))
    .catch(err => res.status(400).json('Error: '+ err));
})
// create one quiz question
router.post('/questions/:id', (req, res) => {

        const module = req.params.id;
        const  description  = req.body.description;
        const  alternatives  = req.body.alternatives;
        const  points = Number(req.body.points);
        const  Correct = req.body.Correct;
        const   lesson = req.body.lesson
        const Questionss = new Question({
            description,
            alternatives,
            points,
            Correct,
            module,
            lesson
        })
        Questionss.module= module;
        Questionss.save()
        .then(() => res.json(Questionss))
        .catch(err => res.status(400).json('Error:' + err));
})

// update one quiz question
router.put('/questions/:id', (req, res) => {
    Question.findById(req.params.id)
    .then(questions => {
        questions.description = req.body.description;
        questions.points = Number(req.body.points);
        questions.alternatives = req.body.alternatives;
        questions.Correct = req.body.Correct;
        questions.save()
        .then(() => res.json('Question updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

// delete one quiz question
router.delete('/questions/:id', (req, res) => {
    Question.findByIdAndDelete(req.params.id)
    .then(() => res.json('Question deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

// this one is just a test
router.get('/', (req, res) => {
    res.send('H3ll0 W0RlD')
})

module.exports = router