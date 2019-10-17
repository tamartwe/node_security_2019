const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = process.env.PORT || 3000;

const router = express.Router();
const route = router.route('/');

// Create endpoint /api/ for POSTS
route.post(async (req, res) => {
 
  const malicousExpression = req.body.malicousExpression;
  eval(malicousExpression);
  return res.json({'message' : 'all is good'});
});

app.use('/api', router);

app.listen(port);