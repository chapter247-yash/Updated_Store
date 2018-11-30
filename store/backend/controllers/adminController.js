const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;
const localStrategy = require('passport-local').Strategy;

const Admin = mongoose.model('Admin');

module.exports.adminRegister = (req, res, next) => {
    console.log(req.body)
    var admin = new Admin();
    admin.username = req.body.username;
    admin.password= req.body.password;
    admin.role = "admin";
    admin.save((err, user) => {
        if (!err){
            res.send(user);
        }
        else {
            console.log(err)
            if (err.code == 11000)
                res.status(422).send(['Username already exist.']);
            else
                return next(err);
        }
    });
}

module.exports.authenticate = (req, res) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {  
        console.log(user)
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token":user.generateJwt()});
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.profile = (req, res) =>{
    Admin.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['username','email']) });
        }
    );
}

// module.exports.verifyUser = async (req,res) =>{
//     console.log(req.body);
//     console.log(req.params.email);
//     var user = new User();
//     let response = await User.findOneAndUpdate({ email: req.params.email },{ "$set": { "active": "true"}});
//     try{
//     if (response.err)
//         return res.status(404).json({ status: false, message: 'Failed to verify the account' }); 
//     else       
//         return res.status(200).json(response);
//     }
//     catch(error){
//     }
// }