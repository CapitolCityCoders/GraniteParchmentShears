import fetch from 'isomorphic-fetch';

//------update player's status to move-------//
export function playerMove(move, userId){
	return fetch('/api/userMove',{
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			move: move,
      userId: userId
		})
	})
  .then(data => data.json())
  .catch(error => console.error(error));
}

//-----------increment player score-----------//
export function incPlayerScore(userId){
	return fetch('/api/incUserScore',{
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
      userId: userId
		})
	})
  .then(data => data.json())
  .catch(error => console.error(error));
}

//--------------get player by id-------------//
export function getPlayerById(userId){
  return fetch('/api/users/' + userId, {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json'
    }
  })
  .then(data => data.json())
  .catch(error => console.error(error));
}

//--------get opponent by player id-----------//
export function getOpponentByPlayerId(userId, gameId){
  return fetch('/api/users/' + userId + '/opponent/' + gameId, {
    method: "GET",
    headers: {
      'Content-Type' : 'application/json'
    }
  })
  .then(data => data.json())
  .catch(error => console.error(error));
}
