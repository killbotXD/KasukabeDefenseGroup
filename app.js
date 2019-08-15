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

app.put('/:id', (req, res) => {
	
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