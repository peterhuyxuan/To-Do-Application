var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Connect to the database
mongoose.connect(
  "mongodb+srv://test:test@cluster0-8pqdc.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Creating a schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model("Todo", todoSchema);

// var data = [{ item: "get milk" }, { item: "walk dog" }, { item: "code" }];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  app.get("/todo", function(req, res) {
    // Get data from MongoDB and pass it to view
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });
  app.post("/todo", urlencodedParser, function(req, res) {
    // Get data from the view and add it to MongoDB
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
  app.delete("/todo/:item", function(req, res) {
    // Delete the requested item from MongoDB
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  });
};
