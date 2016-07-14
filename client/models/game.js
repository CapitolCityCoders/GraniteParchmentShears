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
  }).then(function(json) {
    console.log('in game.js: parsed json', json)
  })
  .catch(function(error){
    console.log(error);
  });

}
export function playerById(userId){
  return fetch('/api/playerStatus', {
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

