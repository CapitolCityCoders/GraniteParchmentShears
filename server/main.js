var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var browserify = require('browserify-middleware');
var history = require('connect-history-api-fallback');
var db = require('./db');

module.exports = app;

app.use(history())
app.use(express.static(path.join(__dirname, "../client/public")));

app.get('/app-bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);

//  socket.io is listening for queues triggered by
//    players, then emits information to both
//  TO DO: synch it up with all player actions so
//    displays match across players in real time

io.on('connection', function(socket){
	socket.on('player ready', function(playerDetails){
		io.emit('game ready', playerDetails)
	})
})

var port = process.env.PORT || 4000;
http.listen(port);
console.log("Listening on localhost: " + port);