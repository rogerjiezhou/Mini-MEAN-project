var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.get('/', function(req, res) {
  
});

app.listen(3307, function() {
  console.log("Server running at port 3307")
});
