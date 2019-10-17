var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

var port = process.env.PORT || 3000;

var router = express.Router();
var beersRoute = router.route('/');

// Create endpoint /api/ for POSTS
beersRoute.post(async (req, res) => {
 
  var malicousExpression = req.body.malicousExpression;
  eval(malicousExpression);
  return res.json({'message' : 'all is good'});
});

app.use('/api', router);

app.listen(port);