var app = require('http').createServer(handler),
io = require('socket.io').listen(app),
fs = require('fs'),
mysql = require('mysql'),

connectionsArray = [],
profile_id,
last_count = 0, //this variable is to check previous count value
connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '**********', //put your own mysql pwd
database: '*******', //put your database name
port: 3306
}),
POLLING_INTERVAL = 1000,
pollingTimer;

// If there is an error connecting to the database
connection.connect(function(err) {
// connected! (unless `err` is set)
console.log(err);
});

// creating the server ( localhost:8000 )
app.listen(8000);

// on server started we can load our client.html page
function handler(req, res) {
fs.readFile(__dirname + '/client.html', function(err, data) {
if (err) {
console.log(err);
res.writeHead(500);
return res.end('Error loading client.html');
}
res.writeHead(200);
res.end(data);
});
}

/*
* HERE IT IS THE COOL PART
* This function loops on itself since there are sockets connected 
* to the page. Upon Update it only emits the notification if 
* the value has changed.
* Polling the database after a constant interval
*/

var pollingLoop = function() {
sql = "SELECT count(id) as c FROM activity_log WHERE notified=0 and (profile_id = '"+profile_id+"')";
// Doing the database query
var query = connection.query(sql),
users = []; // this array will contain the result of our db query

// setting the query listeners
query
.on('error', function(err) {
// Handle error, and 'end' event will be emitted after this as well
console.log(err);
updateSockets(err);
})
.on('result', function(count) {
// it fills our array looping on each user row inside the db
users.push(count); 
// loop on itself only if there are sockets still connected
if (connectionsArray.length) {
pollingTimer = setTimeout(pollingLoop, POLLING_INTERVAL);
updateSockets({
users: users,
count: count.c
});
}
})
};

// creating a new websocket to keep the content updated without any AJAX request
io.sockets.on('connection', function(socket) {

//This variable is passed via the client at the time of socket //connection, see "io.connect(..." line in client.html
profile_id = socket.handshake.query.profile_id;
console.log('Number of connections:' + connectionsArray.length);
// starting the loop only if at least there is one user connected
if (!connectionsArray.length) {
pollingLoop();
}

socket.on('disconnect', function() {
var socketIndex = connectionsArray.indexOf(socket);
console.log('socket = ' + socketIndex + ' disconnected');
if (socketIndex >= 0) {
connectionsArray.splice(socketIndex, 1);
}
});

console.log('A new socket is connected!');
connectionsArray.push(socket);

});

var updateSockets = function(data) {
if (last_count != data.count) {
// adding the time of the last update
data.time = new Date();
// sending new data to all the sockets connected
connectionsArray.forEach(function(tmpSocket) {
tmpSocket.volatile.emit('notification', data);
});
}
last_count = data.count;
};

