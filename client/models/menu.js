import fetch from 'isomorphic-fetch'

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
    .then((gameId) => {
      return gameId.json();
    });
}
