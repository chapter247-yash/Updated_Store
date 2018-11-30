const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
 
var Admin = mongoose.model('Admin');
// var User = mongoose.model('User');

// passport.use(
//     new localStrategy({ usernameField: 'email' },
//         (username, password, done) => {
//             User.findOne({ email: username },
//                 (err, user) => {
//                     if (err)
//                         return done(err);
//                     // unknown user
//                     else if (!user)
//                         return done(null, false, { message: 'Email is not registered' });
//                     // wrong password
//                     else if (!user.verifyPassword(password))
//                         return done(null, false, { message: 'Wrong password.' });
//                     // authentication succeeded
//                     else
//                         return done(null, user);
//                 });
//         })
// );

passport.use(
    new localStrategy(
        (username, password, done) => {
            console.log(username);
            console.log(password);
            Admin.findOne({ username: username },
                (err, user) => {
                    if (err){
                        console.log(err)
                        return done(err);
                    }
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'Username is not registered' });
                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                    {   console.log(user)
                        return done(null, user);
                    }
                });
        })
);