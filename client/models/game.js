import 'fetch' from 'isomorphic-fetch'

export function player1Throw(thrw){
	return fetch('/api/p1throw',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			thrw: thrw
		})
	})
	.then()

}

export function player2Throw(thrw){
	return fetch('/api/p2throw', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			thrw: thrw
		})
	})
	.then()
}