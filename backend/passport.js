const LocalStrategy = require('passport-local').Strategy;
const bycrpt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
//load user model
const User = require('./models/user.model');
const config = require('./config');
const config1 = require('config');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const JWT = require('jsonwebtoken');
const gravatar = require('gravatar');
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

    passport.use(new GoogleStrategy({
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: config.googleAuth.callbackURL
    },
        function (access_token, refreshToken, profile, done) {
            process.nextTick(function () {
                User.findOne({ 'google.id': profile.id }, function (err, user) {

                    if (err) {
                        return done(err);

                    }
                    if (user)
                        return done(null, user)
                    else {

                        var newUser = User();
                        newUser.google.id = profile.id;
                        newUser.google.token = access_token;
                        newUser.google.name = profile.displayName
                        newUser.google.email = profile.emails[0].value
                        newUser.email = profile.emails[0].value
                        newUser.username = profile._json.name
                        newUser.Firstname = profile._json.family_name
                        newUser.Lastname = profile._json.given_name
                        newUser.avatar = profile._json.picture
                        newUser.password = profile._json.email
                        newUser.role = "Student"
                        bycrpt.genSalt(10, (err, salt) =>
                            bycrpt.hash(newUser.password, salt, (err, hash) => {
                                newUser.password = hash;

                                newUser.save();

                            }));
                        console.log(profile)
                        return done(null, newUser)

                    }

                })





            })
        }

    ))

}
