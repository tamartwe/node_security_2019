const express = require('express');

const validator = require('express-validator');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./models/users.js');
const app = express();
app.use(validator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/injectioDemo');


const port = process.env.PORT || 3000;


//Signup API
app.post('/signup', function (req, res) {

    const newUser = new User(req.body);
    newUser.save(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send('User Registered');
        }
    })
});

//Login API
app.post('/login',
    function (req, res) {
        req.checkBody('email', 'Enter a valid email address.').isEmail();
        req.checkBody('password', 'Enter a valid password.').isAlphanumeric();
        const errors = req.validationErrors();
        if (errors) {
            res.send(errors);
            return;
        }
        User.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                res.send('User Login Successful');
            } else {
                res.send('Wrong Username Password Combination');
            }
        })
    });

app.listen(port);