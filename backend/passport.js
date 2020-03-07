const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
//load user model
const User = require('./models/user.model');
const config = require('./config');


module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //Match User 
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'that email is not registred ' });
                    }
                    //Match password 
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        }
                        else {
                            return done(null, false, { message: 'password incorrect  ' });
                        }
                    })
                })
                .catch(err => console.log(err));
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
    const cookieExtractor = req => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['access_token'];
        }
        return token;
    }

    // JSON WEB TOKENS STRATEGY
    passport.use(new JwtStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: config.JWT_SECRET,
        passReqToCallback: true
    }, async (req, payload, done) => {
        try {
            // Find the user specified in token
            const user = await User.findById(payload.sub);

            // If user doesn't exists, handle it
            if (!user) {
                console.log(user);
                return done(null, false);
            }

            // Otherwise, return the user
            req.user = user;
            console.log(user);
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }));

}
