import React from 'react'
import { Link, browserHistory } from 'react-router'

import * as db from '../models/menu'

export default class Menu extends React.Component{
  constructor(){
    super();
    this.state = {
      accessCode: '',
      username: '',
      view: 'menu', 
    };
  }

  componentDidMount() {
    this.socket = io();
  }

  // two-way binding for access code input
  handleAccessCodeChange(e) {
    this.setState({accessCode: e.currentTarget.value});
  }

  // two-way binding for username input
  handleUsernameChange(e) {
    this.setState({username: e.currentTarget.value});
  }

  // generate new access code and reroute to there
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
                // create new user using new gameId
                db.generateNewUser(gameId, this.state.username)
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

  handleJoin(e) {
    e.preventDefault();

    // get current list of games
    db.gameList()
      .then(gameList => {
        const game = gameList.find(e => e.access_code === this.state.accessCode);

        // check if entered access code exists 
        if (game && game.status === 'waiting') {
          db.generateNewUser(game.id, this.state.username)
            .then(userId => {
              userId = userId[0];

              // set current userId to local storage
              sessionStorage.setItem('gameId', game.id);
              sessionStorage.setItem('userId', userId);

              // set game status to full
              db.updateGameStatus(game.id, 'full').then();

              // emits join game to other players
              this.socket.emit('join game', game.id)

              browserHistory.push(`/${this.state.accessCode}`);
            })
        } else {
          // show error message
          console.log('game not found')
        }
      });
  }

  handleViewChange(view, e) {
    e.preventDefault()
    this.setState({view: view});
  }

  // show main menu buttons
  menuView() {
    return (
      <div className="button-container">
        <button onClick={this.handleViewChange.bind(this, 'create')}>New Game</button>
        <button onClick={this.handleViewChange.bind(this, 'join')}>Join Game</button>
      </div>
    );
  }

  // show create game username input and buttons 
  createView() {
    return (
      <form className="create-game">
        <input 
          type="text" 
          placeholder="Enter your name"
          value={this.state.username}
          onChange={this.handleUsernameChange.bind(this)}
        />

        <div className="button-container">
          <button type="submit" onClick={this.handleCreate.bind(this)}>Create Game</button>
          <button onClick={this.handleViewChange.bind(this, 'menu')}>Back</button>
        </div>
      </form>
    );
  }

  // show join game username and access code input and buttons 
  joinView() {
    return (
      <form className="join-game">
        <input 
          type="text" 
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Enter an access code"
          value={this.state.accessCode}
          onChange={this.handleAccessCodeChange.bind(this)}
        />
        <input 
          type="text" 
          placeholder="Enter your name"
          value={this.state.username}
          onChange={this.handleUsernameChange.bind(this)}
        />

        <div className="button-container">
          <button type="submit" onClick={this.handleJoin.bind(this)}>Join Game</button>
          <button onClick={this.handleViewChange.bind(this, 'menu')}>Back</button>
        </div>
      </form>
    );
  }


  // show buttons based on view in state 
  render() {
    return (
      <div className="container six columns offset-by-three">
        <h1>The Rock Shop</h1>
        <hr />
        {
          this.state.view === 'menu'
          ? this.menuView()
          : this.state.view === 'create'
          ? this.createView()
          : this.state.view === 'join'
          ? this.joinView()
          : null
        }
        <hr />
      </div>
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
