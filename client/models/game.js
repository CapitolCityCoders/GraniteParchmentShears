import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

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
	})
  // the two .thens below are the only way
  // that I could get the response to console.log correctly
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    console.log('in game.js: parsed json', json)
  })
  .catch(function(error){
    console.log(error);
  });
}


export function resolveGame(gameId) {
  return fetch('/api/resolveGame', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // post of game ID we want to base as jointable
    body: JSON.stringify({
      gameId: gameId
    })
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(table) {
    console.log("TABLE FROM GAME.JS line 44", table)
  .catch(function(error){
    consoe.log("ERROR FROM GAME.JS line 46", error)
  })
  });
}

// export function player2Throw(thrw){
// 	return fetch('/api/p2throw', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			thrw: thrw
// 		})
// 	})
// 	.then()
// }

// export function check2Throw(){
// 	return fetch('/api/p2Throw', {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type' : 'application/json'
// 		},
// 	})
// 	.then(data => {
// 		console.log(data)
// 		return data.json()

// 	});

// }

