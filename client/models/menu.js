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

//--------------Generate a new Session------------//
export function generateNewSession(user_id, access_token) {
  if (user_id && access_token) {
    return fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        access_token: access_token
      })
    })
    .then(sessionId => sessionId.json())
    .catch(error => console.error(error));
  }
}

//--------------Create a new USer------------//
export function createNewUser(user_id, name, photo_url, friends) {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: user_id,
      name: name,
      photo_url: photo_url,
      friends: friends
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

export function deleteSessionByToken(access_token) {
  console.log('model tells backend to delete session');
  return fetch('/api/sessions', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      access_token: access_token,
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
