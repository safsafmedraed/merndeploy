const crypto = require('crypto');
const User = require('../models/user.model');
const nodemailer = require('nodemailer');
const EMAIL_ADDRESS = require('../config').EMAIL_ADDRESS;
const EMAIL_PASSWORD = require('../config').EMAIL_PASSWORD;
const router = require('express').Router();
require('dotenv').config();
var async = require('async');
const bycrpt = require('bcryptjs');
/***************Send Mail with reset Token****************** */
router.route('/forgotPassword').post(function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    console.log('No account with that email address exists.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },

        function (token, user, done) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${EMAIL_ADDRESS}`,
                    pass: `${EMAIL_PASSWORD}`,
                },
            });

            const mailOptions = {
                from: 'mohamedraed.safsaf@esprit.tn',
                to: `${user.email}`,
                subject: 'Link To Reset Password',
                text:
                    'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                    + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                    + `http://localhost:5000/forgot/reset/${token}\n\n`
                    + 'If you did not request this, please ignore this email and your password will remain unchanged.. \n',
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
});




router.get('/reset/:token', function (req, res) {
    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    }, function (err, user) {
        if (!user) {
            console.log('Get :Password reset token is invalid or has expired.');
            return res.status(403).json("user not found : Prohibeted");
        }
        res.status(200).send({
            username: user.username,
            message: 'password reset link a-ok',
        });
    });
});

router.post('/reset/:token', function (req, res) {
    async.waterfall([
        function (done) {
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: { $gt: Date.now() }
            }, function (err, user) {
                if (!user) {
                    console.log('Post :Password reset token is invalid or has expired.');
                    return res.redirect('/');
                }
                var pass = req.body.password;
                console.log(pass);
                user.password = user.hashPassword(pass);
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function (err) {
                    req.logIn(user, function (err) {
                        done(err, user);
                    });
                });
            });
        },
        function (user, done) {
            const smtpTransport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${EMAIL_ADDRESS}`,
                    pass: `${EMAIL_PASSWORD}`,
                }
            });

            const mailOptions = {
                from: 'mohamedraed.safsaf@esprit.tn',
                to: `${user.email}`,
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };


            console.log('sending mail');

            smtpTransport.sendMail(mailOptions, function (err) {
                console.log('Success! Your password has been changed.');
                done(err);
            });
        }

    ]
        , function (err) {
            res.json('/');
        });




});

module.exports = router;
