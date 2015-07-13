
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var mongojs = require('mongojs')
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

app.put("/messages/post", function (req,res){
	var profileId = req.body;
	/*var name= req.name;
	var story=req.story;
	var image=req.image;*/
	//db.messages.update({"id":profileId},{$push:{"story":story,"name": name,"image":image}})
	db.profile.insert(req.body, function(err, records){
	res.send(req.body + " saved!");	
    }); 

});
var server = app.listen(1337, function () {

    var host = server.address().address;
    var port = server.address().port;
    
    console.log('Example app listening at http://%s:%s', host, port);
    
});
