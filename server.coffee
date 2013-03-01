# Using the expressjs framework http://expressjs.com/
express = require 'express'

# Using MongoSkin https://github.com/guileen/node-mongoskin
# per reccomendation http://support.mongohq.com/starting/mongohq-and-cloud9-ide.html
mongo = require 'mongoskin'

# Module to read files
fs = require 'fs'

# Read in questions
questions = JSON.parse fs.readFileSync __dirname+'/public/data/questions.json', 'ascii'

# Database hosted on mongohq.com
conn = mongo.db 'wes:werx5233@flame.mongohq.com:27072/roshe'

# Standard expressjs startup configuration
app = module.exports = express.createServer()
app.configure ->
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'jade'
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express['static'](__dirname + '/public')

getquestions = (p,res) ->
#  conn.collection('questions').find({"p": p}).toArray(function(err, items){
#    if(err) res.json({error:err});;
#    res.json(items);
#  });
    res.json questions

app.get '/s', (req, res) ->
    console.log req.query,'req.query'
    res.json {success:true}
    conn.collection('answers').update {}, {}, {upsert:true}

app.get '/q', (req, res) ->
    getquestions undefined,res

app.listen process.env.PORT,process.env.IP
console.log 'app listening on port:'+process.env.PORT