import React from 'react';

import * as db from '../models/menu';
import Lobby from './Lobby';
import BattleContainer from './BattleContainer';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'lobby'
    };
  }

  componentDidMount() {
    this.socket = io();
    this.userId = +sessionStorage.getItem('userId');
    this.gameId = +sessionStorage.getItem('gameId');
    
    // listens for 'start game' broadcasts
    // changes view for current client if this gameId matches broadcast gameId
    this.socket.on('start game', gameId => {
      if (gameId === this.gameId) { 
        this.startGame();
      }
    });
  }

  startGame() {
    this.setState({view: 'battle'});
  }

  render() {
    return (
      <div>
        {this.state.view === 'lobby' ?
        <Lobby 
          accessCode={this.props.params.accessCode} 
          startGame={this.startGame.bind(this)}
        /> :
        <BattleContainer />}
      </div>
    );
  }
}
