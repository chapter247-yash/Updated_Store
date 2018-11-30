const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;

const User = mongoose.model('User');

module.exports.authenticate = (req, res) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['name','email']) });
        }
    );
}

module.exports.allUser = (req, res) =>{
    User.find((err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'No registered user' });
            else
                return res.status(200).json({ user : user});
        }
    );
}

module.exports.idUser = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).json(`No record with given id : ${req.params.id}`);

    User.findById(req.params.id, (err, user) => {
        if (!user)
        return res.status(404).json({ status: false, message: 'No registered user' });
    else
        return res.status(200).json({ user : user});
    });
}

module.exports.deleteUser = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (!user)
        return res.status(404).json({ status: false, message: 'Error in deleting the user' });
    else
        return res.status(200).json({ message: 'Deleted the user Successfully!'});
    });
}

module.exports.register = (req, res,next) => {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.mobile = req.body.mobile;
    user.password = req.body.password;
    user.active = "false";
    user.save((err, user) => {
        if (!err){
            res.send(user);
            nodemail.email(user.name,user.email,user.password);
        }
        else {
            console.log(err)
            if (err.code == 11000)
                res.status(422).send(['Email/Mobile Number already exist.']);
            else
                return next(err);
        }

    });
}

module.exports.verifyUser = async (req,res) =>{
    console.log(req.body);
    console.log(req.params.email);
    var user = new User();
    let response = await User.findOneAndUpdate({ email: req.params.email },{ "$set": { "active": "true"}});
    try{
    if (response.err)
        return res.status(404).json({ status: false, message: 'Failed to verify the account' }); 
    else       
        return res.status(200).json(response);
    }
    catch(error){
    }
}
