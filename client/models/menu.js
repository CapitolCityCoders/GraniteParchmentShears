import fetch from 'isomorphic-fetch';

//---------------Create a new Game------------//
export function generateNewGame(accessCode) {
  return fetch('/api/games', {
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

//--------------Create a new User------------//
export function generateNewUser(gameId, name) {
  return fetch('/api/users', {
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

//-----------get all games from db--------------//
export function gameList() {
  return fetch('/api/games', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(games => games.json())
  .catch(error => console.error(error));
}

//-----------get all games by username from db------//
export function gamesByUsername(username) {

  return fetch('/api/userbyname/' + username, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(games => { return games.json()})
  .catch(error => console.error(error));
}

//-----------get all games by player id from db------//
export function gamesByPlayerId(playerId) {

  return fetch(`/api/users/${playerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(games => { return games.json()})
  .catch(error => console.error(error));
}

//-----------get all players from db--------------//
export function playerList() {
  return fetch('/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(players => players.json())
  .catch(error => console.error(error));
}

//-------get players in a certain game---------//
export function userList(gameId) {
  return fetch('/api/games/' + gameId + '/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(players => players.json())
  .catch(error => console.error(error));
}

//------- updates game status -------------------//
export function updateGameStatus(gameId, status) {
  return fetch('/api/gameStatus', {
    method: 'PATCH',
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

//----------Get a Game by ID---------//
export function getGameById(gameId) {
  return fetch('/api/games/' + gameId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(game => game.json())
  .catch(error => console.error(error));
}

//------------Deletions-------------------//
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
//-----------------------------------------//

export function resetUser(userId) {
  return fetch('/api/resetUser', {
    method: 'PATCH',
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
