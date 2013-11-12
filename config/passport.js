var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../app/models/user');

passport.use('demoapplication', new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) {
        email = email.toLowerCase();
        console.log("this")
        console.log(this)
        User.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Unknown user'});
            }

            user.isActive(password, function(valid) {
                if(!valid)
                {
                    return done(null, false, { message: "You haven't activated your account. You'll need to do this before you can login." });
                }
                else{

                    user.validPassword(password, function(valid) {
                        if (!valid) {
                            return done(null, false, { message: 'Invalid password' });
                        }
                        else{
                            return done(null, user);
                        }
                    });

                }
            });
        })
    }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

module.exports = passport;
