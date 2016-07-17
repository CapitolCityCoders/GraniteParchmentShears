import fetch from 'isomorphic-fetch';

export function generateNewGame(accessCode) {
  return fetch('/api/newGame', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      accessCode: accessCode
    })
  })
  .then(gameId => gameId.json())
  .catch(function(error){
    console.error(error);
  });
}

export function generateNewUser(gameId, name) {
  return fetch('/api/newUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gameId: gameId,
      name: name
    })
  })
  .then(userId => userId.json())
  .catch(function(error){
    console.error(error);
  });
}

export function gameList() {
  return fetch('/api/gameList', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(data => {
    return data.json()
  })
  .catch(function(error){
    console.error(error);
  });
}

// get players in a certain game
export function userList(gameId) {
  return fetch('/api/userList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gameId: gameId,
    })
  })
  .then(data => {
    return data.json()
  })
  .catch(function(error){
    console.error(error);
  });
}

// updates game status
export function updateGameStatus(gameId, status) {
  return fetch('/api/gameStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gameId: gameId,
      status: status
    })
  })
  .then()
  .catch(function(error){
    console.error(error);
  });
}

export function getGameById(gameId) {
  return fetch('/api/getGameById', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gameId: gameId,
    })
  })
  .then(data => {
    return data.json()
  })
  .catch(function(error){
    console.error(error);
  });
}
