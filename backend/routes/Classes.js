const nodemailer = require('nodemailer');
const EMAIL_ADDRESS = require('../config').EMAIL_ADDRESS;
const EMAIL_PASSWORD = require('../config').EMAIL_PASSWORD;
var async = require('async');
const router = require('express').Router();
const Class = require('../models/class');
const User = require('../models/user.model');

/****************Teacher classes***************/
router.route('/teacherc').get(async (req,res )=>{

    try{

      const user = await User.find({'role':'Teacher'}).select('Classes')

      res.json(user);


    } catch(err){
      console.error(err)
    }
  }
)


/****************Not affected***************/
router.route('/notaff').get(async (req,res )=>{

        try{

                        const user = await User.find({'role':'Student','ClassU':null})
                           res.json(user);


            } catch(err){
                 console.error(err)
             }
       }
      )

/**********GETall classes***********/
router.route('/Getall').get((req, res) => {
  Class.find().then(classes => res.json(classes)).catch(err => res.status(400).json('Error:' + err));

})


/****************Add class***************/
router.route('/Add').post( (req, res) => {
  const name = req.body.name;
  const section= req.body.section;
 // const Users=req.body.Users;
  Class.findOne({ name: name  }).then(classes => {
    if ( classes) {
      console.log('class  exists');
      res.status(409).json('class exists')

    }
    else
      {


        const newclass = new Class({
          name,
          section,
        // Users

        });
        console.log(newclass);

        newclass.save().then(() => res.status(200).json('class added')).catch(err => res.status(400).json(err))


      }
  });


})

/************Update class************ */
router.route('/update/:id').put((req, res) => {

  Class.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, classes) => {
    if (err) {
      return res.status(500).json("error while updating");
    }
    else {

      res.json("update succesfull");
      return res.send();
    }
  })



})




/************affect user to class************ */
router.route('/affect/:id_c/:id_u').put(function (req, res) {
  async.waterfall([


    async function () {

      console.log(req.params.id_c+' cttu '+req.params.id_u)
      const x = await User.findById(req.params.id_u)
      x.ClassU = req.params.id_c

      x.save();
      const c = await Class.findById(req.params.id_c)
      c.Users.push(x)

      c.save();
      res.json(x)
    },
    async function () {
      const a = await User.findById(req.params.id_u)
      const b = await Class.findById(req.params.id_c)

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${EMAIL_ADDRESS}`,
          pass: `${EMAIL_PASSWORD}`,
        },
      });

      const mailOptions = {
        from: 'mohamed.chabbouh@esprit.tn',
        to: `${a.email}`,
        subject: 'Affectation',
        text:
          'you are assigned to the class\n\n'
          + `${b.name}\n\n`
      };

      console.log('sending mail ');

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.status(200).json('recovery email sent');
        }
      });
    }
  ])

})
/************delete user from  class************ */
router.route('/deletu/:id_c/:id_u').put(async (req, res) => {
  console.log(req.params.id_c+' cttu '+req.params.id_u)
  const x= await User.findById(req.params.id_u)
  x.ClassU=null

  x.save();
  const c= await Class.findById(req.params.id_c)
  c.Users.remove(x)

  c.save();
  res.json(x)

})


/************delete  class************ */
router.route('/delete/:id').delete((req, res) => {

    Class.findByIdAndDelete(req.params.id)
      .then(() => res.json('class deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  })

/************get class by user id************ */

router.route('/class/:user_id').get(async (req, res) => {
  try {
    const classes = await Class.findOne({ Users: req.params.user_id }).populate('classes', ['name'])
    if (!classes) {
      return res.status(400).json({ msg: 'class not found ' });
    }
    res.json(classes);
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'class not found ' });
    }
    res.status(500).send('Server error')
  }
})

/************affect Teacher classes************ */
router.route('/affectt/:id_c/:id_u').put(async (req, res) => {
  console.log(req.params.id_c+' cttu '+req.params.id_u)
  const x= await User.findById(req.params.id_u)
  x.ClassU=req.params.id_c

  x.save();
  const c= await Class.findById(req.params.id_c)
  c.Users.push(x)

  c.save();
  res.json(x)

})
module.exports = router;
