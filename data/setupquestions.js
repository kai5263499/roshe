var mongo = require('mongoskin');
var conn = mongo.db('wes:werx5233@flame.mongohq.com:27072/roshe');

var crypto = require('crypto');

var questions = [{q:"my first question"},{q:"my second question"}];

for(var q in questions) {
    var shasum = crypto.createHash('sha1');
    questions[q]._id = shasum.update(questions[q].q).digest('hex');
}

console.log(questions, 'inserting questions');
conn.collection('questions').insert(questions);