const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
//load user model
const User = require('./models/user.model');
const config = require('./config');


module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        function (email, password, cb) {



            //Assume there is a DB module pproviding a global UserModel
            return User.findOne({ email })
                .then(user => {

                    if (!user) {
                        return cb(null, false, { message: 'Incorrect email or password.' });
                    }
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return cb(null, user, {
                                message: 'Logged In Successfully'
                            });
                        }
                    })


                })
                .catch(err => {
                    return cb(err);
                });
        }
    ));

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
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.JWT_SECRET
    },
        function (jwtPayload, cb) {

            //find the user in db if needed
            return User.findOne(jwtPayload.id)
                .then(user => {
                    return cb(null, user);
                })
                .catch(err => {
                    return cb(err);
                });
        }
    ));
    /************ */
    passport.use(new BearerStrategy(
        function (token, done) {
            User.findOne({ token: token }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user, { scope: 'all' });
            });
        }
    ));

}
