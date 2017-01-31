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
  res.send({ success: true});
})

app.get('/user/:username', function(req, res) {
  db.collection('messageApp')
    .findOne({username : req.params.username}, function(err, data) {
    if(err){
      console.log('Find err');
    }
    else{
      console.log('Find element');
      res.send(data);
    }
  });
})

app.get('/login_check/', function(req, res) {
  var message = {};
  db.collection('messageApp')
    .findOne({
              username : req.query.username,
              password : req.query.password
              },
               function(err, data) {
    if(err){
      console.log('Find err');
    }
    else{
      if(data == null)
        message = { success: false };
      else
        message = { success: true };
      res.send(message);
    }
  });
})

app.listen(3307, function() {
  console.log("Server running at port 3307")
});
