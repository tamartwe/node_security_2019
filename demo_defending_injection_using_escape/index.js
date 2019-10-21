const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const  User =  require('./models/users.js');
const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

mongoose.connect('mongodb://localhost:27017/injectioDemo');


const port = process.env.PORT || 3000;


//Signup API
app.post('/signup', async (req, res) => {

  const newUser = new User(req.body);
  await newUser.save();
  res.send('User Registered');
});

//Login API
app.post('/login',async (req,res) => {
    const escapedEmail = escape(req.body.email);
    const escapedPassword = escape(req.body.password);
    const data = await User.findOne({'email':escapedEmail,'password':escapedPassword});
    if (data) {
        res.send('User Login Successful');
    } else {
        res.send('Wrong Username Password Combination');
    }
});

app.listen(port);

















