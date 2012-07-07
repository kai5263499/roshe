// Using the expressjs framework http://expressjs.com/
var express = require('express');

// Using MongoSkin https://github.com/guileen/node-mongoskin
// per reccomendation http://support.mongohq.com/starting/mongohq-and-cloud9-ide.html
var mongo = require('mongoskin');

// Module to read files
var fs = require('fs');

// Read in questions
var questions = JSON.parse(fs.readFileSync(__dirname+'/public/data/questions.json', 'ascii'));


// Database hosted on mongohq.com
var conn = mongo.db('wes:werx5233@flame.mongohq.com:27072/roshe');

// Standard expressjs startup configuration
var app = module.exports = express.createServer();
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express['static'](__dirname + '/public'));
});

var getquestions = function(p,res) {
//  conn.collection('questions').find({"p": p}).toArray(function(err, items){
//    if(err) res.json({error:err});;
//    res.json(items);
//  });
  
  res.json(questions);
}

app.get('/q', function(req, res){
  getquestions(undefined,res);
});

app.listen(process.env.PORT,process.env.IP);
console.log('app listening on port:'+process.env.PORT);