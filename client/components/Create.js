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
  handleCreate(e) {
    e.preventDefault();
    let gameGenerated = false;
    let accessCode = generateAccessCode();

    // get current list of games
    db.gameList()
      .then(gameList => {
        const accessCodes = gameList.map(game => game.access_code);
        // check if generated access code already exists 
        while (!gameGenerated) {
          if (!accessCodes.includes(accessCode)) {
            // create new game using access code
            db.generateNewGame(accessCode)
              .then(gameId => {
                // select first index because sql query returns array of rows
                gameId = gameId[0];

                // set current gameId to local storage
                sessionStorage.setItem('gameId', gameId);
                return gameId;
              })
              .then(gameId => {

                var username;
                sessionStorage.getItem('fbUser') ? 
                username = sessionStorage.getItem('fbUser')
                : username = this.props.username

                // create new user using new gameId
                db.generateNewUser(gameId, username)
                  .then(userId => {
                    userId = userId[0];

                    // set current userId to local storage
                    sessionStorage.setItem('userId', userId);
                    browserHistory.push(`/${accessCode}`);
                  })
              })
            gameGenerated = true;
          // re generate access code if already exist
          } else {
            accessCode = generateAccessCode();
          }
        }
      })
  }

  // show create game username input and buttons 
 render() {
     return (
      <form className="create-game">
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
          <button type="submit" onClick={this.handleCreate.bind(this)}>Create Game</button>
          <button onClick={this.props.handleViewChange.bind(null, 'menu')}>Back</button>
        </div>
      </form>
    );
  }
}

// generate random access code of 4 letters
function generateAccessCode() {
  let code = "";
  const possible = "abcdefghijklmnopqrstuvwxyz";
  for(let i = 0; i < 4; i++){
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return code;
}
