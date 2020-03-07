const router = require('express').Router();
let User = require('../models/user.model');
const bycrpt = require('bcryptjs');
const passport = require('passport');
const JWT = require('jsonwebtoken');
const JWT_SECRET = require('../config').JWT_SECRET;


const signToken = user => {
    return JWT.sign({
        iss: 'CodeWorkr',
        user: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
}


/**************GET USERS*************/
router.route('/').get(passport.authenticate('jwt', { session: false }), (req, res) => {

    User.find().then(users => res.json(users)).catch(err => res.status(400).json('Error:' + err))

})


/*******Register*********/
router.route('/register').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const Firstname = req.body.Firstname;
    const Lastname = req.body.Lastname;
    //const borndate=req.body.borndate;

    User.findOne({ email: email }).then(user => {
        if (user) {
            console.log("user exists!")
            res.json('user exists');
        }
        else {
            const newUser = new User({
                username,
                email,
                password,
                Firstname,
                Lastname,
                // borndate
            })
            bycrpt.genSalt(10, (err, salt) =>
                bycrpt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    const token = signToken(newUser);
                    res.cookie('access_token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
                    newUser.save().then(() => res.json('user registred and you can log in your token is : ' + token)).catch(err => res.status(400).json('Error:' + err));
                }));

        }

    })

})
//Login handle 
router.route('/login').post(function (req, res, next) {

    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(err);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            const token = JWT.sign(user.toJSON(), JWT_SECRET);

            return res.json({ user, token });
        });
    })
        (req, res);

});

//Logout 
router.route('/logout').get((req, res) => {
    res.clearCookie('access_token');
    req.logout();
    res.json("logged out ")
    console.log('Logged out');

})
/* function verifytoken(req, res, next) {
    //get auth header value 
    const bearerHeader = req.headers['authorization'];
    //check if bearer is indefined 
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        //get token from array 
        const bearerToken = bearer[1];
        //set the token 
        req.token = bearerToken;
        next();
    } else {
        //forbiden
        res.status(403).json('Error:' + err);
    }
} */

module.exports = router;