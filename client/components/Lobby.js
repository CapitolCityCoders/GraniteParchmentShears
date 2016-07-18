import React from 'react'
import { Link } from 'react-router'

import * as db from '../models/menu'

export default class Lobby extends React.Component{
  constructor() {
    super();
    this.state = {
      players: [],
      gameStatus: 'waiting'
    };
  }

  componentDidMount() {
    this.userId = +sessionStorage.getItem('userId');
    this.gameId = +sessionStorage.getItem('gameId');


    this.refreshGameStatus();
    this.populatePlayers();
    // listens for 'join game' broadcasts
    // refreshes player list if gameId in broadcast matches current gameId
    socket.on('join game', (gameId) => {
      if (gameId === this.gameId) { 
        this.populatePlayers();
        this.refreshGameStatus();
      }
    });

    socket.on('leave game', (gameId) => {
      if (gameId === +sessionStorage.getItem('gameId')) { 
        this.populatePlayers();
        this.refreshGameStatus();
      }
    });
  }

  populatePlayers() {
    db.userList(this.gameId)
      .then(players => {
        this.setState({players: players});
      });
  }

  refreshGameStatus() {
    db.getGameById(sessionStorage.getItem('gameId'))
      .then(game => {
        this.setState({gameStatus: game[0].status});
      });
  }

  handleNameChange() {
    // db call to update player name 
  }

  handleStartGame() {
    // set game status to inProgress
    db.updateGameStatus(this.gameId, 'inProgress').then();

    // socket emit for other player to update state and start game
    socket.emit('start game', this.gameId)

    this.props.startGame();
  }

  handleLeaveGame() {
    // if player is the only one in the game, delete user and game record from db
    // else delete current user record from db and 
    // socket emit leave game to make the other client refresh player list
    if (this.state.players.length === 1) {
      db.deleteUserById(this.userId).then();
      db.deleteGameById(this.gameId).then();
      sessionStorage.removeItem('gameId');
      sessionStorage.removeItem('userId');
    } else {
      db.updateGameStatus(this.gameId, 'waiting').then(() => {
        db.deleteUserById(this.userId).then();
        sessionStorage.removeItem('gameId');
        sessionStorage.removeItem('userId');
        socket.emit('leave game', this.gameId);
      });
    }
  }

  render() {
    return (
      <section className="narrative container six columns offset-by-three">
        {this.state.gameStatus === 'waiting' ?
          <h4>Waiting for opponent...</h4> :
          this.state.gameStatus === 'full' ?
          <h4>Game ready</h4> :
          null}

        <div className="access-code">
          Access Code: 
          <span> {this.props.accessCode} </span>
        </div>

        <hr />

        <ol className="lobby-player-list">
          {this.state.players.map(player => 
            <li key={player.id}>
              {player.name} 

              {/* show edit button if current player */}
              {player.id === this.userId ?
                <a 
                  href="#" 
                  className="btn-edit-player"
                  onClick={this.handleNameChange.bind(this)}
                >
                  <i className="fa fa-pencil"></i>
                </a> :
                null}

              {/* add if not current player logic
              <a href="#" className="btn-remove-player">
                <i className="fa fa-close"></i>
              </a>
              */}

            </li>)}
        </ol>

        <hr />

        <div className="button-container">
          {this.state.gameStatus === 'waiting' ?
            <button disabled>Start Game</button> :
            this.state.gameStatus === 'full' ?
            <button onClick={this.handleStartGame.bind(this)}>Start Game</button> :
            null}
          <Link to="/">
            <button onClick={this.handleLeaveGame.bind(this)}>
              Leave Game
            </button>
          </Link>
        </div>

      </section>
    );
  }
}
