//Dependencies and imported files
// var friends = require("./app/data/friends.js");
var apiRoutes = require("./app/routing/apiRoutes.js");
var htmlRoutes = require("./app/routing/htmlRoutes.js");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();


//Setting up port, initializing body-parser
var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//importing routes and setting up server
htmlRoutes(app,path);
apiRoutes.routes(app);
app.listen(PORT, function() {
	console.log("App is listening on port " + PORT);
})