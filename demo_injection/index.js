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
app.post('/signup', function (req, res) {

  const newUser = new User(req.body);
  newUser.save(function(err,data){
    if(err){
        res.send(err);
    }else{
        res.send('User Registered');
    }
  })
});

//Login API
app.post('/login',function(req,res){
    User.findOne({'email': req.body.email,'password':req.body.password},function(err,data){
        if(err){
            res.send(err);
        }else if(data){
            res.send('User Login Successful');
        }else {
            res.send('Wrong Username Password Combination');
        }
    })
});

app.listen(port);