const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Marine name can\'t be empty'
    },
    email : {
        type: String,
        required: 'Email can\'t be empty',
    },
    subject : {
        type: String,
        required: 'Subject can\'t be empty',
    },
    message: {
        type:String ,
        required: 'Message can\'t be empty',
    }
});

mongoose.model('Message', messageSchema);