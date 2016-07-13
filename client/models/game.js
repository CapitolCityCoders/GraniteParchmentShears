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

export function check2Throw(){
	return fetch('/api/p2Throw', {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json'
		},
	})
	.then(data => {
		console.log(data)
		return data.json()
		);
	}

}

