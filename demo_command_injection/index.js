const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const child_process = require('child_process');

const  Person =  require('./models/persons.js');
const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

mongoose.connect('mongodb://localhost:27017/securityDemo');


const port = process.env.PORT || 3000;


app.get('/', function (req, res) {
  child_process.exec(
    // transfer "Story.txt; rm -rf src/"
    'gzip ' + req.query.file_path,
    function (err, data) {
      console.log('err: ', err)
      console.log('data: ', data);
    });
  res.send('Zip Done')
})

app.listen(port);