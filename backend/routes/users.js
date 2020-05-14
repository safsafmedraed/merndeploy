const router = require('express').Router();
let User = require('../models/user.model');
const bycrpt = require('bcryptjs');
const passport = require('passport');
const JWT = require('jsonwebtoken');
const JWT_SECRET = require('../config').JWT_SECRET;
const config = require('config');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
let Quizzz = require('../models/Quizz');
const { check, validationResult } = require('express-validator');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dkep6n2mk',
    api_key: '822133848497339',
    api_secret: '-ej2WW3P7rWZtSYBZ3npmvQ9fKw'
})
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
})





let Question = require('../models/Questions');

/**************GET USERS*************/
router.route('/').get(auth, (req, res) => {

    User.find().then(users => res.json(users)).catch(err => res.status(400).json('Error:' + err))

})



/*******Register*********//*********Token expire in 1 hour******** */
router.route('/register').post([
    check('Firstname', 'First name is required')
        .not()
        .isEmpty(),
    check('Lastname', 'Last name is required')
        .not()
        .isEmpty(),
    check('username', 'username is required')
        .not()
        .isEmpty(),
    check('phonenumber', 'phone number is required')
        .isLength({
            min: 8
        }),
    check('email', 'Please enter a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({
            min: 6
        })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const Firstname = req.body.Firstname;
    const Lastname = req.body.Lastname;

    const borndate = req.body.borndate;
    const role = req.body.role;
    const bornplace = req.body.bornplace;
    const phonenumber = req.body.phonenumber;
    const Classes = req.body.Classes;
    const Quizzs = [];
    const quizzexist = false
    const note = 0;
    const Questionbank = [];
    const Module = [];
    try {
        // See if user exists
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User Already exists' }] })
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        user = new User({
            username,
            email,
            password,
            Firstname,
            Lastname,
            borndate,
            role,
            bornplace,
            phonenumber,
            avatar,
            quizzexist,
            Quizzs,
            Classes,
            note,
            Module
        })
        bycrpt.genSalt(10, (err, salt) =>
            bycrpt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                const payload = {
                    user: {
                        id: user.id
                    }
                }
                const token = JWT.sign(payload, config.get('jwtSecret'), {
                    expiresIn: 3600
                });
                user.save().then(() => res.json({ user, token })).catch(err => res.status(400).json(err));
            }));

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
}
);
router.get('/userid/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/userclasse/:classe', (req, res) => {
    var query = req.params.classe;
    User.find({ role: "Student", 'Classes': query })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
})
router.put('/usernoquizz/:id/:quizzid/:note', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if( user.Quizzs.length=== user.answerd)
            {
                user.quizzexist = false
            }
            user.note = user.note + Number(req.params.note)
            console.log(req.params.quizzid)
            let found = user.Quizzs.find(element => element = req.params.quizzid)
            console.log("////////////////" + found)
            found.score = req.params.note;
            found.answerd = true;
            user.answered = user.answered + 1
            user.save()
                .then(() => res.json('User state updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})
router.put('/userquestion/:id/:questionid', (req, res) => {
    console.log(req.params.questionid)
    User.findById(req.params.id)
        .then(user => {
            Question.findById(req.params.questionid)
                .then(kk => {
                    /*user.Questionbank.push(kk._id)
                    user.save()*/
                    console.log(user.Questionbank)
                }).catch(err => res.status(400).json('Error: ' + err));
        }).catch(err => res.status(400).json('Error: ' + err));
})
/*router.put('/Userquizz/:id/:quizzid', (req, res) => {
    
    User.findById(req.params.id)
    .then(user => {
        user.quizzexist =true
             
        Quizzz.findById(req.params.quizzid)
        .then(kk => {
        user.Quizzs.push(kk._id)
        user.save()
        
    })
        .then(() => res.json('quizz updated!'+user))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    })*/
router.route('/Userquizz/:id/:quizzid').put(async (req, res) => {
    console.log(req.params.id + ' //////// ' + req.params.quizzid)
    const x = await User.findById(req.params.id)
    x.quizzexist = true;
    x.Quizzs.push(req.params.quizzid)

    x.save();

    res.json(x)

})
router.route('/UserModule/:id/:module').put(async (req, res) => {
    console.log(req.params.id + ' //////// ' + req.params.module)
    const x = await User.findById(req.params.id)
    x.Modules.push(req.params.module)

    x.save();

    res.json(x)

})
//Login handle  /*********Token expire in 1 hour******** */
router.route('/login').post([
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({
                email
            })
            if (!user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'Invalid credentials'
                    }]
                })
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    errors: [{
                        msg: 'Invalid credentials'
                    }]
                })
            }
            const payload = {
                user: {
                    id: user.id
                }
            }

            const token = JWT.sign(payload, config.get('jwtSecret'), {
                expiresIn: 3600
            });
            // res.cookie('access_token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
            return res.json({ user, token });
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')

        }
    }

);
//edit account 
router.route('/update').post([
    check('Firstname', 'First name is required')
        .not()
        .isEmpty(),
    check('Lastname', 'Last name is required')
        .not()
        .isEmpty(),
    check('username', 'username is required')
        .not()
        .isEmpty(),
    check('phonenumber', 'phone number is required')
        .isLength({
            min: 8
        }),
    check('email', 'Please enter a valid email')
        .isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username,
        email,
        //   password,
        Firstname,
        Lastname,
        borndate,
        bornplace,
        phonenumber } = req.body;
    //build profile object
    const profileFields = {};
    // profileFields = req._id
    if (username) profileFields.username = username;
    if (email) profileFields.email = email;
    // if (password) profileFields.password = password;
    if (Firstname) profileFields.Firstname = Firstname;
    if (Lastname) profileFields.Lastname = Lastname;
    //if (borndate) profileFields.borndate = borndate;
    if (bornplace) profileFields.bornplace = bornplace;
    if (phonenumber) profileFields.phonenumber = phonenumber;

    try {

        // See if user exists
        let user = await User.findOne({ user: req.email });
        if (user) {
            user = await User.findOneAndUpdate({ user: req.email }, {
                $set:
                    profileFields,
            },
                { new: true });
            return res.json(user);
        }


    } catch (err) {
        console.error(err.message + "ddddddd");
        res.status(500).send('Server error')
    }
}
);
//get current user account 
router.route('/me').get(auth, async (req, res) => {
    try {
        const user = await User.findOne({ user: req.email })
        if (!user) {
            return res.status(400).json({ msg: 'there is no profile for this user ' });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error')
    }
});

//Logout 
router.route('/logout').get((req, res) => {

    //res.clearCookie('access_token');
    req.logout();
    res.json("logged out ")
    console.log('Logged out');

})
//edit avatar
router.route('/upload/:id').post(async (req, res) => {

    const upload = multer({ storage }).single('avatar')


    let avatar = req.body

    try {
        upload(req, res, async function (err) {
            if (err) {
                return res.send(err)
            }

            const path = req.file.path
            console.log(path)
            cloudinary.uploader.upload(
                path,
                async function (err, image) {

                    if (err) return res.send(err)
                    console.log('file uploaded to Cloudinary')
                    // remove file from server
                    const fs = require('fs')
                    fs.unlinkSync(path)
                    // return image details
                    avatar = image.url
                    console.log(avatar)
                    const profileFields = {};

                    if (avatar) profileFields.avatar = avatar;




                    // See if user exists
                    let user = await User.findOne({ _id: req.params.id });
                    console.log(user)
                    if (user) {

                        user = await User.findOneAndUpdate({ _id: req.params.id }, {
                            $set:
                                profileFields,

                        },
                            { new: true });
                        return res.json(user);


                    }
                })

        }
        )


    } catch (err) {
        console.error(err.message + "ddddddd");
        res.status(500).send('Server error')
    }

})
router.route('/getavatar/:id').get(async (req, res) => {
    let user = await User.findOne({ _id: req.params.id });
    res.json(user.avatar)
})
router.get('/userid/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;