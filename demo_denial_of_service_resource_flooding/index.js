const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const  Person =  require('./models/persons.js');
const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

mongoose.connect('mongodb://localhost:27017/injectioDemo');


var port = process.env.PORT || 3000;

const RateLimit = require('express-rate-limit');
// important if behind a proxy to ensure client IP is passed to req.ip
//app.enable('trust proxy'); 
 
const apiLimiter = new RateLimit({
  windowMs: 1*60*1000, // 1 minutes
  max: 50,
  message: 'Rate limit exceeded',
  statusCode: 429
});

app.use(apiLimiter);


//Signup API
app.post('/person', async (req, res) => {
  console.log(req.ip);
  var newPerson = new Person();
  newPerson.name = req.body.name;
  newPerson.lastName = req.body.lastName;
  newPerson.address = req.body.address;
  await newPerson.save();
  return res.send({'result' : newPerson});
});

app.listen(port);