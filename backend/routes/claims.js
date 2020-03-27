var express = require('express');
var router = express.Router();
var claim = require('../models/claim.model');

router.get('/',(req , res)=>{
    claim.find({},(err , data)=>{
        if (err) throw err;
        return res.status(200).json(data);
    });
});

router.post('/addClaim' , (req , res)=>{
    const newClaim = new claim(req.body);
    //newClaim.set({title:"aaaa" , description:"desc"});
    console.log(newClaim);
    newClaim.save().then(()=>res.json(newClaim)).catch(e=>res.send(e.message));
});

router.put('/answer', (req , res)=>{
    claim.findOneAndUpdate({_id:req.query.id},
        {response:req.body.response, responseDate: new Date() , solved : true},
        {new:true},
        (err ,data)=>{
            console.log(err);
        if (data == null) return res.status(404).send("not found");
        return res.status(200).json(data);
    
      });
});

module.exports = router;