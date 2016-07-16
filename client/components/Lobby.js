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
    this.socket = io();
    this.userId = +sessionStorage.getItem('userId');
    this.gameId = +sessionStorage.getItem('gameId');


    this.refreshGameStatus();
    this.populatePlayers();
    // listens for 'join game' broadcasts
    // refreshes player list if gameId in broadcast matches current gameId
    this.socket.on('join game', (gameId) => {
      if (gameId === this.gameId) { 
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
    this.socket.emit('start game', this.gameId)

    this.props.startGame();
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
          <Link to="/"><button>Leave Game</button></Link>
        </div>

      </section>
    );
  }
}
