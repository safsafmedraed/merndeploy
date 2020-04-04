var express = require('express');
var router = express.Router();
var claim = require('../models/claim.model');
const auth = require('../middleware/auth');

router.get('/',auth,(req , res)=>{
    claim.find().populate({
        path : "user",
        model : "users"
    }).exec((err , data)=>{
        return res.status(200).json(data);
    });
});

router.get('/:id',auth,(req,res) => {
    claim.findById(req.params.id, (err ,data) =>{
        if(err) return res.status(400).send("error"); 
        return res.status(200).json(data);
    }).populate('user');
}
);

router.get('/userClaims/:id',auth,(req , res)=>{
    claim.find({user:req.params.id},(err , data)=>{
        return res.status(200).json(data);
    }).populate('user');
});

router.post('/addClaim',auth , (req , res)=>{
    const newClaim = new claim(req.body);
    newClaim.save().then(()=>res.json(newClaim)).catch(e=>res.status(400).send(e.message));
});

router.put('/answer',auth, (req , res)=>{
    claim.findOneAndUpdate({_id:req.body._id},
        {response:req.body.response, dateResponse: new Date() , solved : true , removed : false},
        {new:true},
        (err ,data)=>{
            console.log(err);
        if (data == null) return res.status(404).send("not found");
        return res.status(200).json(data);
      }).populate('user');
});

router.put('/block/:id',auth, (req , res)=>{
    claim.findOneAndUpdate({_id:req.params.id},
        {removed : true},
        {new:true},
        (err ,data)=>{
            console.log(err);
        if (data == null) return res.status(404).send("not found");
        return res.status(200).json(data);
      }).populate('user');
});

module.exports = router;