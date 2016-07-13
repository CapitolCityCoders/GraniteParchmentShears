import 'fetch' from 'isomorphic-fetch'

export function player1Throw(){
	return fetch('/api/p1throw',{

	})
}

export function player2Throw(){
	return fetch('/api/p2throw', {
		
	})
}