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
         res.status(200).json(data);
    }).populate('user').populate('admin');
}
);

router.get('/processed/:id',auth,(req,res) => {
    claim.findOneAndUpdate({_id:req.body._id},
        {processed : true},
        {new:true},
        (err ,data)=>{
            res.send(data);
            return setTimeout(() => {
                claim.findOneAndUpdate({_id:req.body._id},
                    {processed : false},
                    {new:true},
                    (err ,data)=>{
                        console.log("ok");
                  }).populate('user');
            }, 5000);
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
        {response:req.body.response, admin :  req.body.admin, dateResponse: new Date() , solved : true , removed : false , lock : false},
        {new:true},
        (err ,data)=>{
        if (data == null) return res.status(404).send("not found");
        return res.status(200).json(data);
      }).populate('user');
});

router.put('/block/:id',auth, (req , res)=>{
    claim.findOneAndUpdate({_id:req.params.id},
        {removed : true , dateRemove : new Date() , lock : false},
        {new:true},
        (err ,data)=>{
        if (data == null) return res.status(404).send("not found");
        return res.status(200).json(data);
      }).populate('user');
});

router.put('/lock/:id',auth, (req , res)=>{
    claim.findOneAndUpdate({_id:req.params.id},
        {response:req.body.response, admin :  req.body.admin, lock : true , removed : false},
        {new:true},
        (err ,data)=>{
        if (data == null) return res.status(404).send("not found");
        return res.status(200).json(data);
      }).populate('user');
});


router.put('/unlock/:id',auth, (req , res)=>{
    claim.findOneAndUpdate({_id:req.params.id},
        {lock : false , response : ""},
        {new:true},
        (err ,data)=>{
        if (data == null) return res.status(404).send("not found");
        return res.status(200).json(data);
      }).populate('user');
});

router.get('/admin/stat',auth,(req , res)=>{
    const claimsSolvedPerAdmin =claims=>{
        const solvedPerAdmin = [];
        claims.filter(c=>c.solved === true).forEach(c=>{
            const admin = c.admin;
            if(!solvedPerAdmin.some(c=>c.admin._id === admin._id)){
                const newSolvedPerAdmin = {admin : admin , claims:0 , claimsPerDate : [] , avgSolvedPerDate : 0}
                const data = claims.filter(c=>c.solved === true && c.admin._id === admin._id);
                newSolvedPerAdmin.claimsPerDate = claimsSolvedPerDate(data);
                newSolvedPerAdmin.claimsPerDate.forEach(e=>newSolvedPerAdmin.claims+=e.claims);
                newSolvedPerAdmin.avgSolvedPerDate = Math.round(newSolvedPerAdmin.claims / newSolvedPerAdmin.claimsPerDate.length); 
                solvedPerAdmin.push(newSolvedPerAdmin);
            }
        });
        solvedPerAdmin.forEach(admin=>admin.percentage = admin.claims / claims.filter(c=>c.solved===true).length * 100);
        return solvedPerAdmin;
    }
    const claimsSolvedPerDate =claims=>{
        const solvedPerDate = [];
        claims.filter(c=>c.solved === true).forEach(c=>{
            const date = new Date(c.dateResponse.getFullYear()+"-"+(c.dateResponse.getMonth()+1)+"-"+c.dateResponse.getDate());
            if(solvedPerDate.some(c=>c.date - date === 0))
                solvedPerDate.filter(c=> c.date - date === 0).forEach(c=>c.claims +=1);
            else{
                const newSolvedPerDate = {date : date , claims : 1}
                solvedPerDate.push(newSolvedPerDate)
            }
        });
        return solvedPerDate;
    }
    const claimsPerDate =claims=>{
        const solvedPerDate = [];
        claims.forEach(c=>{
            const date = new Date(c.date.getFullYear()+"-"+(c.date.getMonth()+1)+"-"+c.date.getDate());
            if(solvedPerDate.some(c=>c.date - date === 0))
                solvedPerDate.filter(c=> c.date - date === 0).forEach(c=>c.claims +=1);
            else{
                const newSolvedPerDate = {date : date , claims : 1}
                solvedPerDate.push(newSolvedPerDate)
            }
        });
        return solvedPerDate;
    }
    const claimsInProgressPerDate =claims=>{
        const solvedPerDate = [];
        claims.filter(c=>c.solved === false && c.removed === false).forEach(c=>{
            const date = new Date(c.date.getFullYear()+"-"+(c.date.getMonth()+1)+"-"+c.date.getDate());
            if(solvedPerDate.some(c=>c.date - date === 0))
                solvedPerDate.filter(c=> c.date - date === 0).forEach(c=>c.claims +=1);
            else{
                const newSolvedPerDate = {date : date , claims : 1}
                solvedPerDate.push(newSolvedPerDate)
            }
        });
        return solvedPerDate;
    }
    const claimsRemovedPerDate =claims=>{
        const solvedPerDate = [];
        claims.filter(c=>c.removed === true).forEach(c=>{
            const date = new Date(c.dateRemove.getFullYear()+"-"+(c.dateRemove.getMonth()+1)+"-"+c.dateRemove.getDate());
            if(solvedPerDate.some(c=>c.date - date === 0))
                solvedPerDate.filter(c=> c.date - date === 0).forEach(c=>c.claims +=1);
            else{
                const newSolvedPerDate = {date : date , claims : 1}
                solvedPerDate.push(newSolvedPerDate)
            }
        });
        return solvedPerDate;
    }
    claim.find().populate('admin').exec((err , data)=>{
        const result = {
            total : 0,
            solved : 0,
            inProgress :0,
            block : 0,
            dureeSolved : [],
            dureeInProgress : [],
            avgSolved : 0,
            maxInProgress : 0,
            solvedPerDate : [],
            removedPerDate : [],
            InProgressPerDate : [],
            claimsPerDate : [],
            avgSolvedPerDate :0,
            maxSolvedPerDate : 0,
            solvedPerAdmin :[]
        };
        result.total = data.length;
        result.solved = data.filter(c=>c.solved === true).length;
        result.block = data.filter(c=>c.removed === true).length;
        result.inProgress = data.filter(c=>c.solved === false && c.removed === false).length;
        data.filter(c=>c.solved === true).forEach(c=>result.dureeSolved.push(
            parseInt((c.dateResponse-c.date)/(1000 * 60 * 60))
            ));
        data.filter(c=>c.solved === false && c.removed === false).forEach(c=>result.dureeInProgress.push(
            parseInt(((new Date())-c.date)/(1000 * 60 * 60))
            ));
        result.avgSolved = parseInt(result.dureeSolved.reduce((a,b)=>a+b)/result.dureeSolved.length);
        result.maxInProgress = Math.max(...result.dureeInProgress);
        result.solvedPerDate = claimsSolvedPerDate(data);
        result.claimsPerDate = claimsPerDate(data);
        result.removedPerDate = claimsRemovedPerDate(data);
        result.InProgressPerDate = claimsInProgressPerDate(data);
        result.solvedPerDate.forEach(a=>{
            if(a.claims>result.maxSolvedPerDate) result.maxSolvedPerDate = a.claims;
            result.avgSolvedPerDate += a.claims;
        });
        result.avgSolvedPerDate = Math.round(result.avgSolvedPerDate/result.solvedPerDate.length);
        result.solvedPerAdmin = claimsSolvedPerAdmin(data);
        return res.status(200).json(result);
    });
});

module.exports = router;