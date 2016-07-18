import React from 'react'
import { Link, browserHistory } from 'react-router'

import * as db from '../models/menu'

export default class Join extends React.Component {
  constructor(){
    super();
  }

  handleJoin(e) {
    e.preventDefault();

    // get current list of games
    db.gameList()
      .then(gameList => {
        const game = gameList.find(e => e.access_code === this.props.accessCode);

        // check if entered access code exists 
        if (game && game.status === 'waiting') {
          db.generateNewUser(game.id, this.props.username)
            .then(userId => {
              userId = userId[0];

              // set current userId to local storage
              sessionStorage.setItem('gameId', game.id);
              sessionStorage.setItem('userId', userId);

              // set game status to full
              db.updateGameStatus(game.id, 'full').then();

              // emits join game to other players
              socket.emit('join game', game.id)

              browserHistory.push(`/${this.props.accessCode}`);
            })
        } else {
          // show error message
          console.log('invalid game')
        }
      });
  }

  // show join game username and access code input and buttons 
  render() {
    return (
      <form className="join-game">
        <input 
          type="text" 
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Enter an access code"
          value={this.props.accessCode}
          onChange={this.props.handleAccessCodeChange}
        />
        <input 
          type="text" 
          placeholder="Enter your name"
          value={this.props.username}
          onChange={this.props.handleUsernameChange}
        />

        <div className="button-container">
          <button type="submit" onClick={this.handleJoin.bind(this)}>Join Game</button>
          <button onClick={this.props.handleViewChange.bind(null, 'menu')}>Back</button>
        </div>
      </form>
    );
  }
}
