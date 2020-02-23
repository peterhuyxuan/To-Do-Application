var express = require("express");
var todoController = require("./controllers/todoControllers");

var app = express();

// Set up th template engine
app.set("view engine", "ejs");

// Static files
app.use(express.static("./public"));

// Fire controllers
todoController(app);

// Listening to the port
app.listen(3000);
console.log("You are listening to port 3000");
