// requires dependancies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// sets port to 3000
var PORT = process.env.PORT || 3000;


var app = express();

// sets up express router
var router = express.Router();

// requites routes tofile to pass through router object!!
require("./config/routes")(router);

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

// uses deployed database or local 
var db = (process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines");

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true }, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Mongoose has connected successfully");
    }
});

// listens to the port
app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
});
