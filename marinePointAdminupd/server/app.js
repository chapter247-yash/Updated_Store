require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
var session = require('express-session')
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose');
var path = require('path');
var multer = require('multer')
// var logger = require('morgan');
// var flash = require('connect-flash');
// var validator = require('express-validator');
// var MongoStore = require('connect-mongo')(session);

const rtsIndex = require('./routes/index.route');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));

app.use(passport.initialize());
// app.use(logger('dev'));
// app.use(validator());
// app.use(cookieParser());
// app.use(flash());
app.use(passport.session());

app.use('/', rtsIndex);

// app.use(session({
//   secret: 'mysupersecret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true, maxAge: 180 * 60 * 1000 },
//   store: new MongoStore({ mongooseConnection: mongoose.connection }),
// }))

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));
