const router = require('express').Router();
const Presence = require('../models/presence');
const Class = require('../models/class')


/**********GETall Presence***********/
router.route('/Getall').get((req, res) => {
  Presence.find().then(presences => res.json(presences)).catch(err => res.status(400).json('Error:' + err));

})



/****************Marquer présence***************/
router.route('/marquer/:id_c').post(async(req, res) => {

  const classe= await Class.findById(req.params.id_c)
  const presents= req.body.presents;


      const newPresence = new Presence({

        classe ,
        presents

      });
      console.log(newPresence);
  newPresence.save().then(() => res.status(200).json('presence  marquée')).catch(err => res.status(400).json(err))



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
