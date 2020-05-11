const nodemailer = require('nodemailer');
const EMAIL_ADDRESS = require('../config').EMAIL_ADDRESS;
const EMAIL_PASSWORD = require('../config').EMAIL_PASSWORD;
var async = require('async');
const router = require('express').Router();
const Class = require('../models/class');
const User = require('../models/user.model');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Module = require('../models/Module.model');





/****************Teacher classes pour Admin***************/
router.route('/teachercl/:teacherid').get(async (req, res) => {
  const teacherid = req.params.teacherid;
  try {
    const user = await User.findById(teacherid)
    const cl = user.Classes

    res.json(cl);

  } catch (err) {
    console.error(err)
  }

}

)


/****************Teacher modules pour Admin***************/
router.route('/teachermd/:teacherid').get(async (req, res) => {
  const teacherid = req.params.teacherid;
  try {
    const user = await User.findById(teacherid)
    const cl = user.Modules

    res.json(cl);

  } catch (err) {
    console.error(err)
  }
}
)

/****************Teacher***************/
router.route('/teacher').get(async (req, res) => {
  try {
    const user = await User.find({ 'role': 'Teacher' })
    res.json(user);

  } catch (err) {
    console.error(err)
  }
}
)

/****************Teacher classes***************/
router.route('/myclasses').get(auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const cl = user.Classes;
    res.json(cl);

  } catch (err) {
    console.error(err)
  }
}
)


/****************get users by id_class ***************/
router.route('/users/:classid').get(async (req, res) => {
  try {
    const classs = await Class.findById(req.params.classid)

    res.json(classs);
  } catch (err) {
    console.error(err)
  }




})
/****************Not affected***************/
router.route('/notaff').get(async (req, res) => {
  try {
    const user = await User.find({ 'role': 'Student', 'ClassU': null }).sort({ Firstname: 1 })
    res.json(user);
  } catch (err) {
    console.error(err)
  }
})

/**********GETall classes***********/
router.route('/Getall').get(async (req, res) => {
  try {
    const Classs = await Class.find()
    res.json(Classs);
  } catch (err) {
    console.error(err)
  }

})

/****************Add class***************/
router.route('/Add').post([

  check('name', ' Name is required')
    .not()
    .isEmpty(),
  check('section', 'Section is required')
    .not()
    .isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const name = req.body.name;
  const section = req.body.section;
  try {

    let classes = await Class.findOne({ name: name })
    if (classes) {
      return res.status(400).json({ errors: [{ msg: 'Class Already exists' }] })

    }

    classes = new Class({
      name,
      section,
    })

    const cl = await classes.save();
    res.json(cl);

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }

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




/************affect student to class************ */
router.route('/affect/:studentid').put(function (req, res) {

  async.waterfall([
    async function () {

      const classid = req.body.classid;
      const studentid = req.params.studentid;
      try {

        console.log(classid + "//// " + studentid)
        const c = await Class.findById(classid)
        const x = await User.findById(studentid)
        const y = x.ClassU;
        if (y.cl != null) { return res.status(400).json({ errors: [{ msg: 'User Already affected  ' }] }) }


        y.cl = req.body.classid
        y.classname = c.name

        x.save();

        let newusers = []
        let newuser = {
          user: studentid,
          cl: classid,
          name: x.Firstname,
          lastname: x.Lastname,
          email: x.email,
          phonenumber: x.phonenumber
        }
        newusers.push(newuser);
        let ww = c.Users;
        ww.push.apply(ww, newusers);
        await c.save();
        res.json(c.Users)




        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `${EMAIL_ADDRESS}`,
            pass: `${EMAIL_PASSWORD}`,
          },
        });

        const mailOptions = {
          from: 'mohamed.chabbouh@esprit.tn',
          to: `${x.email}`,
          subject: 'Affectation',
          text:
            'you are assigned to the class\n\n'
            + `${c.name}\n\n`
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
      catch (error) {
        console.error(error)
        res.status(500).send('server Error')
      }
    }
  ])

})
/************delete student from  class************ */
router.route('/deletu/:id_c/:user_id').delete(async (req, res) => {
  try {

    const c = await Class.findById(req.params.id_c)
    const u = await c.Users.find(u => u.id == req.params.user_id)
    const a = u.user
    const b = await User.findById(a)
    b.ClassU = null
    await b.save()

    if (!u) {
      return res.status(404).json({ msg: 'user not found ' })
    }

    const removeIndex = c.Users.map(u => u.id.toString()).indexOf(req.params.user_id);
    c.Users.splice(removeIndex, 1)

    await c.save();
    res.json(c.Users);




  } catch (error) {
    console.error(error)
    res.status(500).send('server Error')
  }

})

/************delete  class************ */
router.route('/delete/:id').delete((req, res) => {

  Class.findByIdAndDelete(req.params.id)
    .then(() => res.json('class deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/classeid/:id', (req, res) => {
  Class.findById(req.params.id)
    .then(classe => res.json(classe))
    .catch(err => res.status(400).json('Error: ' + err));
})


/************affect Teacher classes************ */
router.route('/affectteacher').post(function (req, res) {
  async.waterfall([
    async function () {
      try {
        const classid = req.body.classid;
        const teacherid = req.body.teacherid;
        console.log(classid + '' + teacherid)

        const x = await User.findById(teacherid)
        const v = await Class.findById(classid)
        let z = await x.Classes.find(z => z.classe == classid)
        if (z) {
          return res.status(400).json({ errors: [{ msg: 'Class Already affected for this teacher ' }] })

        }


        const newclass = {
          classe: req.body.classid,
          classename: v.name,

        }
        x.Classes.unshift(newclass);
        await x.save();
        res.json(x.Classes)

        const a = await User.findById(req.body.teacherid)
        const b = await Class.findById(req.body.classid)

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
            '\n' +
            'Administration assigns you to lead the class\n\n'
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
      } catch (error) {
        console.error(error)
        res.status(500).send('server Error')
      }
    }
  ])
})


/************affect Teacher Modules************ */
router.route('/affectTModule/:moduleid').post(function (req, res) {
  async.waterfall([
    async function () {
      try {
        const moduleid = req.params.moduleid;
        const teacherid = req.body.teacherid;
        console.log(moduleid + '' + teacherid)

        const x = await User.findById(teacherid)
        const m = await Module.findById(moduleid)
        let z = await x.Modules.find(z => z.modid == moduleid)
        if (z) {
          return res.status(400).json({ errors: [{ msg: 'Module Already affected for this teacher ' }] })

        }

        let newmods = []
        let newmodule = {
          modid: moduleid,
          name: m.name,

        }
        newmods.push(newmodule);
        let ww = x.Modules;
        ww.push.apply(ww, newmods);
        await x.save();





        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `${EMAIL_ADDRESS}`,
            pass: `${EMAIL_PASSWORD}`,
          },
        });

        const mailOptions = {
          from: 'thewitchertwin3@gmail.com',
          to: `${x.email}`,
          subject: 'Affectation',
          text:
            '\n' +
            'Administration assigns you to lead the Module\n\n'
            + `${m.name}\n\n`
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
      } catch (error) {
        console.error(error)
        res.status(500).send('server Error')
      }
    }
  ])
})
/**********GETall modules***********/
router.route('/getmodules').get(async (req, res) => {
  try {
    const mod = await Module.find()
    res.json(mod);
  } catch (err) {
    console.error(err)
  }

})

module.exports = router;
