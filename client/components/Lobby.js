import React from 'react'
import { Link } from 'react-router'

import * as db from '../models/menu'

export default class Lobby extends React.Component{
  constructor() {
    super();
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    db.playerList(localStorage.getItem('gameId'))
      .then(players => {
        console.log('players list: ', players);
        this.setState({players: players});
      });
  }

  render() {
    return (
      <section className="container six columns offset-by-three">
        <h4>Waiting for opponent...</h4>

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
          <button>Start Game</button>
          <Link to="/"><button>Leave Game</button></Link>
        </div>

      </section>
    );
  }
}
