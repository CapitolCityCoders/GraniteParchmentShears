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
  .catch(error => console.error(error));
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
  .catch(error => console.error(error));
}

export function gameList() {
  return fetch('/api/gameList', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(games => games.json())
  .catch(error => console.error(error));
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
  .then(players => players.json())
  .catch(error => console.error(error));
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
  .then(data => data.json())
  .catch(error => console.error(error));
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
  .then(game => game.json())
  .catch(error => console.error(error));
}

export function deleteGameById(gameId) {
  return fetch('/api/games', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gameId: gameId,
    })
  })
  .then(data => data.json())
  .catch(error => console.error(error));
}

export function deleteUserById(userId) {
  return fetch('/api/users', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: userId,
    })
  })
  .then(data => data.json())
  .catch(error => console.error(error));
}
