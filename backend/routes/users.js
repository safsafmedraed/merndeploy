const router = require('express').Router();
let User = require('../models/user.model');


/**************GET USERS*************/
router.route('/').get((req,res)=>{
    User.find().then(users=>res.json(users)).catch(err=>res.status(400).json('Error:' +err));
})
/********Add USer********** */
router.route('/add').post((req,res)=>{
const username =req.body.username;
const newUser= new User({username});
newUser.save().then(()=>res.json('user added')).catch(err=>res.status(400).json('Error:' +err));
})
/*********DELETE USER********* */
router.route('/:id').delete((req,res)=>{
User.findByIdAndDelete(req.params.id).then(()=>res.json('user deleted')).catch(err=>res.status(400).json('Error:' +err));
})
/************UPDATE USER**************/
router.route('/update/:id').post((req,res)=>
{
User.findById(req.params.id).then(User=>{
    User.username= req.body.username;
    User.save().then(()=>res.json('updated !!')).catch(err=>res.status(400).json('Error:' +err));
}).catch(err=>res.status(400).json('Error:' +err));
})



module.exports= router;