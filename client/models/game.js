import fetch from 'isomorphic-fetch';

// Is there a way to make GET requests AND send on db query search
// parameters without having to make it a POST request and include
// those parameters as properties in the body?
  // Yes, you put the info on the url to send it through and then
  // use "req.params" or "req.query" to grab the information with express

//---------------post player's move-----------//
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

//--------------get player name---------------//
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
  .then(data => data.json())
  .catch(error => console.error(error));
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
  .then(data => data.json())
  .catch(error => console.error(error));
}


