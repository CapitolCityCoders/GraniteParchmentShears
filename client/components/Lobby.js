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
    this.refreshGameStatus();
    this.populatePlayers();
    // listens for 'join game' broadcasts
    // refreshes player list if gameId in broadcast matches current gameId
    this.socket.on('join game', (gameId) => {
      if (gameId === +sessionStorage.getItem('gameId')) { 
        this.populatePlayers();
        this.refreshGameStatus();
      }
        
    });
  }

  populatePlayers() {
    db.userList(sessionStorage.getItem('gameId'))
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

  render() {
    return (
      <section className="container six columns offset-by-three">
        {this.state.gameStatus === 'waiting' ?
          <h4>Waiting for opponent...</h4> :
          this.state.gameStatus === 'full' ?
          <h4>Waiting for players to ready up</h4> :
          this.state.gameStatus === 'ready' ?
          <h4>Both players ready</h4> :
          null}

        <div className="access-code">
          Access Code: 
          <span> {this.props.params.accessCode} </span>
        </div>

        <hr />

        <ol className="lobby-player-list">
          {this.state.players.map(player => 
            <li key={player.id}>
              {player.name} 

              {/* add if current player logic */}
              <a href="#" className="btn-edit-player">
                <i className="fa fa-pencil"></i>
              </a>

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
            <button disabled>Ready</button> :
            this.state.gameStatus === 'full' ?
            <button>Ready</button> :
            this.state.gameStatus === 'ready' ?
            <button>Start Game</button> :
            null}
          <Link to="/"><button>Leave Game</button></Link>
        </div>

      </section>
    );
  }
}
