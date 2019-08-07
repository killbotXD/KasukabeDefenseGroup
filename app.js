const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

let PORT = process.env.PORT || 3000;

app.use('/css', express.static('public/css'));
app.use('/javascript', express.static('public/javascript'));
app.use('/images', express.static('public/images'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './app/index.html'));
});

http.createServer(app).listen(PORT, function(){
  console.log('listening on: ' + PORT);
});