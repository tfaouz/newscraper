// requires dependancies
var express = require("express");

// sets port to 3000
var PORT = process.env.PORT || 3000;


var app = express();

// sets up express router
var router = express.Router();

// public folder is static directory
app.use(express.static(__dirname + "/public"));

// everything goes through router middleware 
app.use(router);

// listens to the port
app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
});
