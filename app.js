
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('test',["messages"]);

app = express();
app.use(bodyParser.json());

app.get("/messages/all", function (req, res) {	
	db.messages.find(function(err, records) {
		if (records.length == 0) {				
			res.status(404);
			res.send('No profiles exist'); 
		} else {
			res.send(JSON.stringify(records));
		}
	})
}); 

app.get("/messages/main", function (req, res){
	var noProfiles= db.profile.count();
	var random= Math.floor(Math.random()* noProfiles);
	res.send(JSON.stringify(db.profile.find().limit(1).skip(0).next()));
	});

app.put("/messages/put", function (req,res){
	var profile = req.body;
	db.messages.insert(profile, function(err, records) {
		if(err) {
			console.log(err)
		} else {
			res.send(JSON.stringify(records)+" inserted!");
			res.status(200);
		}
    }); 

});

//updates the vote counter, haven't tested it - Lesley, will fix profile id later
//profile id is not unique, might need to add another id for messages id?
app.post("/messages/weirdness", function (req,res){
	var profileId = req.body;
	db.messages.update({profile_id: profileId},{$inc : { likes: 1 }}, function(err, records){
		res.send(req.body + " likes updated!");	
	});
});

var server = app.listen(1337, function () {

    var host = server.address().address;
    var port = server.address().port;
    
    console.log('Example app listening at http://%s:%s', host, port);
    
});
