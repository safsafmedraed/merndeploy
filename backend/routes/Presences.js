const router = require('express').Router();
const Presence = require('../models/presence');
const Class = require('../models/class')
const auth = require('../middleware/auth');
const User = require('../models/user.model');


/**********GETall Presence***********/
router.route('/Getall').get((req, res) => {
  Presence.find().then(presences => res.json(presences)).catch(err => res.status(400).json('Error:' + err));

})



/****************Marquer présence***************/
router.route('/marquerpr/:studentid').put(auth,async(req, res) => {
  try {
    const classid = req.body.classid;
    const studentid = req.params.studentid;
    const y = await User.findById(studentid)
    const t = await User.findById(req.user.id)
    let  z = await t.Classes.find(z => z.classe == classid)

    console.log()
    const  presence = new Presence();
    presence.teacher.teacherid =t.id;
    presence.teacher.Firstname =t.Firstname;
    presence.teacher.Lastname =t.Lastname;
    presence.teacher.email=t.email;
    presence.classe.className=z.classename;

    let newusers=[];

    let newuser = {
      user: studentid,
      cl: classid,
      Firstname: y.Firstname,
      Lastname: y.Lastname,
      email: y.email,
    }
    newusers.push(newuser)



    presence.presents  =newusers;

    presence.save();
    res.json(presence)

  }
  catch (err) {
      console.error(err.message);
      res.status(500).send('Server error')
    }

})



/****************update présence***************/

router.route('/update/:id').put((req, res) => {

  Presence.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, classes) => {
    if (err) {
      return res.status(500).json("error while updating");
    }
    else {
      res.json("update succesfull");
      return res.send();
    }
  })



})


/************delete  présence************ */
router.route('/delete/:id').delete((req, res) => {

  Presence.findByIdAndDelete(req.params.id)
    .then(() => res.json('presence deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;
