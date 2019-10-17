const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
	extended: true
}));

const port = process.env.PORT || 3000;

const router = express.Router();
const route = router.route("/");

// Create endpoint /api/ for POSTS
route.post(async (req, res) => {
 
	const pathFromUserInput = req.body.pathFromUserInput;
	fs.readFile(pathFromUserInput);
	return res.json({"message" : "all is good"});
});

app.use("/api", router);

app.listen(port);