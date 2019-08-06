const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/public/app/index.html'));
});

http.createServer(app).listen(PORT, function(){
  console.log('listening on: ' + PORT);
});