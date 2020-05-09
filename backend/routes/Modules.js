const express = require('express')
const router = express.Router()
let Lesson = require('../models/Lesson');
let Module = require('../models/Module.model');

router.get('/Module', (req, res) => {
    Module.find()
    .then(module => res.json(module))
    .catch(err=> res.status(400).json('error:'+err));
})

router.get('/Module/:id', (req, res) => {
    Module.findById(req.params.id)
    .then(module => res.json(module))
    .catch(err => res.status(400).json('Error: ' + err));
})
// create one quiz question
router.post('/Module', (req, res) => {
        
    const  name  = req.body.name;
    const module = new Module({
        name
    })
    
    module.save()
    .then(() => res.json(module))
    .catch(err => res.status(400).json('Error:' + err));
})
router.route('/addLTo/:id/:idq').put(async (req, res) => {
    console.log(req.params.id + ' //////// ' + req.params.idq)
    const x = await Module.findById(req.params.id)
    x.Lessons.push(req.params.idq)
    x.save();
    res.json(x)

})
module.exports = router