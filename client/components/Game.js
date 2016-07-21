import React from 'react';

import * as Menu from '../models/menu';
import Lobby from './Lobby';
import BattleContainer from './BattleContainer';
import End from './End';

//-------------------------Sets up Pre-Battle Views--------------//
export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'lobby',
      rematch: false,
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

    socket.on('rematch', gameId => {
      if (gameId === this.gameId) { 
        this.setState({rematch: true});
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

  //  make a rematch function to pass to the end component
  //  upon clicking rematch, it sets the view state back to lobby

  rematch(){
    if (!this.state.rematch) {
      // emit socket stuff
      // reset db
      //    reset player scores and status
      Promise.all([
        Menu.updateGameStatus(this.gameId, 'waiting'),
        Menu.resetUser(this.userId)
      ])
        .then(() => {
          socket.emit('rematch', this.gameId);
          this.setState({view: 'lobby'});
        });
    } else {
      Promise.all([
        Menu.updateGameStatus(this.gameId, 'full'),
        Menu.resetUser(this.userId)
      ])
        .then(() => {
          socket.emit('join game', this.gameId);
          this.setState({view: 'lobby'});
        });
    }
  };

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
          gameId={this.gameId}
          userId={this.userId}
          winner={this.state.winner}
          rematch={this.rematch.bind(this)} 
        />}
      </div>
    );
  }
}
