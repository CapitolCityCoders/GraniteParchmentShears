import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

export function playerThrow(thrw, userId){
	return fetch('/api/users',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			thrw: thrw
		})
	})
	.then(function(response){
		console.log("game.js: ", response.body);
	})
  .catch(function(error){
    console.log(error);
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

