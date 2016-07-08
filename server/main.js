var express = require('express');
var server = require('http').Server(app);
//var io = require('socket.io')(server);
//var db = require('db')
var app = express()

var path = require('path');
var history = require('connect-history-api-fallback');
var browserify = require('browserify-middleware');





// SocketIO Configuration
//var io = require('socket.io').listen(app);
//
//io.sockets.on('connection', function(socket) {
//  socket.on('user note', function (note) {
//    console.log(note);
//  });
//});


// ALTERNATIVE SocketIO Configuration
// server.listen(80);

// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });




app.use(history());
app.use(express.static(path.join(__dirname, "../client/public")));

app.get('/app-bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);



var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on localhost:" + port);
