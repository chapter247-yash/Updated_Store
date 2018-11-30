const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const User = mongoose.model('User');

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