const express = require('express');
const router = express.Router();
const passport = require('passport');

//Google auth login
router.route('/auth/google').get(passport.authenticate('google', { scope: ['email', 'profile'] }));
router.route('/auth/google/callback').get(passport.authenticate("google", { failureRedirect: "/", session: false }),
    function (req, res) {
        var token = req.user.token;
        res.redirect("http://localhost:3000?token=" + token);
    }
);



module.exports = router;