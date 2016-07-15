import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

//---------------post player's move-----------//
export function playerMove(move, userId){
	return fetch('/api/users',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			move: move,
      userId: userId
		})
	}).then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('in game.js: parsed json', json)
  })
  .catch(function(error){
    console.log(error);
  });
}

//-------------------get player name----------//
export function getPlayerById(userId){
  return fetch('/api/getPlayerById', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      userId: userId
    })
  })
  .then(function(data) {
    return data.json()
  })
}

//-------------get opponent name--------------//
export function getOpponentByPlayerId(userId, gameId){
  return fetch('/api/getOpponentByPlayerId', {
    method: "POST",
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      userId: userId,
      gameId: gameId
    })
  })
  .then(function(data){
    return data.json()
  })
}


