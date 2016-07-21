import React from 'react'
import { Link, browserHistory } from 'react-router'

import * as db from '../models/menu'

export default class Join extends React.Component {
  constructor(){
    super();
  }
componentWillMount(){
  this.fbName = sessionStorage.getItem('fbUser');
}

  handleJoin(e) {
    e.preventDefault();

    // get current list of games
    db.gameList()
      .then(gameList => {
        const game = gameList.find(e => e.access_code === this.props.accessCode);

        // check if entered access code exists 
        // console.log("showing games in join.js:", gameList, game);
        if (game && game.status === 'waiting') {
            var username;
            sessionStorage.getItem('fbUser') ? 
            username = sessionStorage.getItem('fbUser')
            : username = this.props.username;

            var imageUrl;
            sessionStorage.getItem('imgUrl') ? 
            imageUrl = sessionStorage.getItem('imgUrl')
            : null;

          db.generateNewUser(game.id, username, imageUrl, 'join')
            .then(userId => {
              // console.log("showing returned user id in Create:", userId);
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

        {this.fbName ? 
        <h4>{this.fbName}</h4>
        :
        <input 
          type="text" 
          placeholder="Enter your name"
          value={this.props.username}
          onChange={this.props.handleUsernameChange}
        />
      }


        <div className="button-container">
          <button type="submit" onClick={this.handleJoin.bind(this)}>Join Game</button>
          <button onClick={this.props.handleViewChange.bind(null, 'menu')}>Back</button>
        </div>
      </form>
    );
  }
}
