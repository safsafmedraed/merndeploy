const express = require('express')
const router = express.Router()
let Lesson = require('../models/Lesson');
let Question = require('../models/Questions');

router.get('/Lesson', (req, res) => {
    Lesson.find()
    .then(lesson => res.json(lesson))
    .catch(err=> res.status(400).json('error:'+err));
})

router.get('/Lesson/:id', (req, res) => {
    Lesson.findById(req.params.id)
    .then(lesson => res.json(lesson))
    .catch(err => res.status(400).json('Error: ' + err));
})
// create one quiz question
router.post('/Lesson', (req, res) => {
        
    const  name  = req.body.name;
    const lesson = new Lesson({
        name
    })
    
    lesson.save()
    .then(() => res.json(lesson))
    .catch(err => res.status(400).json('Error:' + err));
})
router.route('/addTo/:id/:idq').put(async (req, res) => {
    console.log(req.params.id + ' //////// ' + req.params.idq)
    const x = await Lesson.findById(req.params.id)
    x.Quizzs.push(req.params.idq)

    x.save();

    res.json(x)

})
router.route('/addQTo/:id/:idq').put(async (req, res) => {
    console.log(req.params.id + ' //////// ' + req.params.idq)
    const x = await Lesson.findById(req.params.id)
    x.Questions.push(req.params.idq)

    x.save();

    res.json(x)

})
module.exports = router