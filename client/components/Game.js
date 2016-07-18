import React from 'react';

import * as db from '../models/menu';
import Lobby from './Lobby';
import BattleContainer from './BattleContainer';
import End from './End';

//-------------------------Sets up Pre-Battle Views--------------//
export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'lobby',
      winner: ''
    };
  }

  componentDidMount() {
    this.userId = +sessionStorage.getItem('userId');
    this.gameId = +sessionStorage.getItem('gameId');
    
    // listens for 'start game' broadcasts
    // changes view for current client if this gameId matches broadcast gameId
    socket.on('start game', gameId => {
      if (gameId === this.gameId) { 
        this.startGame();
      }
    });
  }

  startGame() {
    this.setState({view: 'battle'});
  }

  endGame(winner) {
    this.setState({
      view: 'end',
      winner: winner
    });
  }

  render() {
    return (
      <div>
        {this.state.view === 'lobby' ?
        <Lobby 
          accessCode={this.props.params.accessCode} 
          startGame={this.startGame.bind(this)}
        /> : this.state.view === 'battle' ?
        <BattleContainer 
          endGame={this.endGame.bind(this)} 
        /> : 
        <End 
          winner={this.state.winner} 
        />}
      </div>
    );
  }
}
