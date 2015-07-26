
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('test',["messages"]);

app = express();
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
 });

app.get("/messages/all", function (req, res) {	
	db.messages.find(function(err, records) {
		if (records.length === 0) {				
			res.status(404);
			res.send('No profiles exist'); 
		} else {
			res.set('Content-Type', 'application/json');
			res.send(JSON.stringify(records));
		}
	});
}); 

app.get("/messages/main", function (req, res){
	db.messages.find(function(err, records) {
		var obj = [];

		if (records.length === 0) {				
			res.status(404);
			res.send('No profiles exist'); 
		} else {
			var top = records[0].likes;
			var second = records[1].likes;

			if(top > second) {
				obj[0] = records[0];
				obj[1] = records[1];
			}

			if(top < second) {
				obj[0] = records[1];
				obj[1] = records[0];
				var top = records[1].likes;
				var second = records[0].likes;
			}

			for(var i=2; i<records.length; i++) {

				if (records[i].likes > second) {
					second = records[i].likes;
					obj[1] = records[i];
				}
				if (records[i].likes > top) {
					second = top;
					obj[1] = obj[0];
					top = records[i].likes;
					obj[0] = records[i];
				}
			}
			res.set('Content-Type', 'application/json');
			res.send(JSON.stringify(obj));
		}
	});
});

app.put("/messages/put", function (req,res){
	
	var profile = req.body;
	db.messages.insert(profile, function(err, records) {
		if(err) {
			console.log(err);
		} else {
			res.send(JSON.stringify(records)+" inserted!");
			res.status(200);
		}
    }); 

});

//updates the vote counter, haven't tested it - Lesley. 
//Will fix profile id later
//profile id is not unique, might need to add another id for messages id?
app.post("/messages/weirdness", function (req, res){
	var id = req.body;
	db.messages.update( id, { $inc: { likes: 1 } }, function(err, records){
		res.send(req.body + " likes updated!");	
		res.status(200);
	});
});

var server = app.listen(1338, function () {

    var host = server.address().address;
    var port = server.address().port;
    
    console.log('Example app listening at http://%s:%s', host, port);
    
});
