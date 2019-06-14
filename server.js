// requires dependancies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// sets port to 3000
var PORT = process.env.PORT || 3000;


var app = express();

// sets up express router
var router = express.Router();

// public folder is static directory
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// enables bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}));



// everything goes through router middleware 
app.use(router);

// listens to the port
app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
});
