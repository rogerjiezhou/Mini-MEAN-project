var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

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
});


app.get('/', function(req, res) {
  
});

app.post('/regiter_user', function(req, res) {
  db.collection('user').save(req.body, function(err, result) {
    if(err)
      console.log('Save err');
    else
      console.log('Saved to db');
  })
  res.send({ success: true});
});

app.get('/user/:username', function(req, res) {
  db.collection('user')
    .findOne({username : req.params.username}, function(err, data) {
    if(err){
      console.log('Find err');
    }
    else{
      console.log('Find element');
      res.send(data);
    }
  });
});

app.put('/updateUser', function(req, res) {
  var message = {};
  var params = req.body.params;
  db.collection('user')
    .update({_id: ObjectID(params.id)},{$set: JSON.parse(params.user)}, function(err, data) {
    if(err){
      console.log('Update err');
      message = { data: false };
    }
    else{
      console.log('Updated');
      message = { data: true };
    }
  });
  res.send(message);
});

app.get('/login_check/', function(req, res) {
  var message = {};
  db.collection('user')
    .findOne({
              username : req.query.username,
              password : req.query.password
              },
               function(err, data) {
    if(err){
      console.log('Find err');
    }
    else{
      if(data == null || data == {})
        message = { success: false };
      else
        message = { success: true };
      res.send(message);
    }
  });
});

app.get('/messages', function(req, res) {

  db.collection('message').find().toArray(function(err, message){
    if(err){
      console.log('Find messgae err');
    } else {
      console.log('Find messages');
      res.json(message);
    }
  });  

});

app.get('/messageDetail/:messageID', function(req, res) {
  db.collection('message').findOne({_id: ObjectID(req.params.messageID)}, 
    function(err, data) {
    if(err){
      console.log('Find message by id err');
    }
    else{
      console.log('Find message detail');
      res.send(data);
    }
  })
});

app.delete('/deleteMessage/:messageID', function(req, res) {
  db.collection('message').remove({_id: ObjectID(req.params.messageID)}, 
    function(err, data) {
    if(err){
      console.log('Delete message by id err');
    }
    else{
      console.log('Delete message');
      res.send(data);
    }
  })
});


app.listen(3307, function() {
  console.log("Server running at port 3307")
});
