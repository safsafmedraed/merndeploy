const User = require('../models/user.model');
const router = require('express').Router();


router.route('/reset').get((req, res) => {
    User.findOne({

        resetPasswordToken: req.query.resetPasswordToken,
        /* resetPasswordExpires: {
            [Op.gt]: Date.now(),

        } */
    }).then((user) => {
        if (user == null) {
            console.error('password reset link is invalid or has expired');
            res.status(403).send('password reset link is invalid or has expired');
        } else {
            res.status(200).send({
                username: user.username,
                message: 'password reset link a-ok',
            });
        }
    });
});

module.exports = router;