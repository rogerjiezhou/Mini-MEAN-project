var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var conn = 'mongodb://localhost:27017/messageApp';
var db;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}))

MongoClient.connect(conn, function(err, database) {
  if(err)
    console.log("Error");
  else
    console.log("Connected to db");
  db = database;
})


app.get('/', function(req, res) {
  
});

app.post('/regiter_user', function(req, res) {
  db.collection('messageApp').save(req.body, function(err, result) {
    if(err)
      console.log('Save err');
    else
      console.log('Saved to db');
  })
})

app.listen(3307, function() {
  console.log("Server running at port 3307")
});
