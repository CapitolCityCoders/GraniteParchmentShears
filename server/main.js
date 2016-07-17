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


//--------------Express Middlware-------------//
//--------------------------------------------//
// Load all files --> get this to load style files in index.html
app.use(express.static(path.join(__dirname, "../client/public")));
// Parse the body of response
app.use(bodyParser.json());
// Generic error handling,
  // Commented out because express comes with default error handling
// app.use(function(err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });


// taking accessCode from request body, create new game record in db
app.post('/api/newGame', (req, res) => {
  db('games').insert({
    access_code: req.body.accessCode,
    status: 'waiting'
  })
  .then(gameId => {
    res.send(gameId)
  })
  // We were handling errors this way:
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
});

// taking gameId and username from request body, create new user record in db
app.post('/api/newUser', (req, res) => {
  db('users').insert({
    game_id: req.body.gameId,
    name: req.body.name,
    score: 0,
    status: 'waiting'
  })
  .then(userId => {
    res.send(userId)
  })
});

// returns array of game objects
app.get('/api/gameList', (req, res) => {
  db.select('*').from('games')
    .then(rows => {
      res.send(rows);
    })
});

// returns array of player objects that match a given gameId
app.post('/api/userList', (req, res) => {
  db('users').where('game_id', req.body.gameId)
    .then(rows => {
      res.send(rows);
    })
});

// returns the game that matches a given gameId
app.post('/api/getGameById', (req, res) => {
  db('games').where('id', req.body.gameId)
    .then(rows => {
      res.send(rows);
    })
});

//----- updates game status that matches a given gameId----//
app.post('/api/gameStatus', (req, res) => {
  db('games').where('id', req.body.gameId).update('status', req.body.status)
    .then()
});

//--- updates user status that matches a given userId-----//
app.post('/api/userStatus', (req, res) => {
  db('users').where('id', req.body.userId).update('status', req.body.status)
    .then()
});

//------------ post player throw-------------//
//--------------------------------------------//
app.post('/api/users', (req,res) => {
  let move = req.body.move;
  let userId = req.body.userId;

  // insert the move under status where id === userId
  db('users').where('id', userId).update({status: move})
    .then(() => {
      res.send({move});
	    // res.sendStatus(200);
    })
});

//----------- increment player score----------//
//--------------------------------------------//
app.post('/api/incUserScore', (req,res) => {
  let userId = req.body.userId;

  // increment the score by 1 where id === userId
  db('users').where('id', req.body.userId).increment('score', 1)
    .then(() => {
      res.send({userId});
    })
});

//------------ get player object by id-------//
//-------------------------------------------//
app.post('/api/getPlayerById', (req,res) => {
  let userId = req.body.userId;
  db.select('*').from('users').where('id', userId)
    .then((data) => {
      res.send(data)
    })
})
//------get opponent object by player id-----//
//-------------------------------------------//
app.post('/api/getOpponentByPlayerId', (req,res) => {
  let userId = req.body.userId;
  let gameId = req.body.gameId;
  db.select('*').from('users').where('game_id', '=', gameId).whereNot('id', '=', userId)
    .then((data) => {
      res.send(data)
    })
})

// use history api fallback middleware after defining db routes
// to not interfere with get requests
app.use(history());


app.get('/app-bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);

//  socket.io is listening for queues triggered by
//    players, then emits information to both
io.on('connection', function(socket){
	socket.on('join game', gameId => {
		io.emit('join game', gameId)
	})

	socket.on('start game', gameId => {
		io.emit('start game', gameId)
	})

	socket.on('resolve round', gameId => {
		io.emit('resolve round', gameId)
	})

	socket.on('end game', data => {
		io.emit('end game', data)
	})
})

var port = process.env.PORT || 4000;
http.listen(port);
console.log("Listening on localhost:" + port);
