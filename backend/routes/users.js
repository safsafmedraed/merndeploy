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
const { check, validationResult } = require('express-validator');
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
            avatar
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



//Logout
router.route('/logout').get((req, res) => {
    //res.clearCookie('access_token');
    req.logout();
    res.json("logged out ")
    console.log('Logged out');

})


module.exports = router;
