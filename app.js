const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const app = express();
let collection = "Jodhpur";

let PORT = process.env.PORT || 3000;
const db = require('./db');


app.use(bodyParser.json());
app.use('/css', express.static('public/css'));
app.use('/javascript', express.static('public/javascript'));
app.use('/images', express.static('public/images'));


app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, './app/index.html'));
});

app.get('/stats', function(req, res){
	res.sendFile(path.join(__dirname, './app/stats.html'));
});

app.get('/:id', (req, res) => {
    const vId = req.params.id;
    db.getDb().collection(collection).findOne({ _voterId : vId }, (err, doc) => {
        if(err)
            console.log("Error");
        else {
			console.log(doc);
			res.jsonp(doc);
		}
    });
});


app.get('/stats/:city', (req, res) => {
	let slot0 = 0, slot1 = 0, slot2 = 0, slot3 = 0;
	const city = req.params.city;
	db.getDb().collection(collection).find({}).toArray(function(err, doc){
        if(err)
            console.log("Error");
        else {
			doc.forEach(data => {
				switch(data._choice)
				{
					case 0:
						slot0++;
						break;
					case 1:
						slot1++;
						break;
					case 2:
						slot2++;
						break;
					case 3:
						slot3++;
						break;
				}	
			});
			let obj = { _slot0 : slot0, _slot1 : slot1, _slot2 : slot2, _slot3 : slot3};
			console.log(JSON.stringify(obj));
			res.jsonp(obj);
		}
    });
});

app.put('/:id/:slot', (req, res) => {
	const vId = req.params.id;
	const slotSelected = req.params.slot;
	db.getDb().collection(collection).findOneAndUpdate({ _voterId : vId }, {$set : {_choice : parseInt(slotSelected)}}, (err, doc) => {
        if(err)
            console.log("Error");
        else {
			console.log(doc);
			res.jsonp(doc);
		}
    });
});

db.connect((err) => {
	if(err)
		throw err;
	else {
		http.createServer(app).listen(PORT, function(){
			console.log('listening on: ' + PORT);
		});
	}
})