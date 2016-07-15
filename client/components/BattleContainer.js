import React from 'react'

import Menu from './Menu'
import Player from './Player'
// opponent
import Mike from './Mike'
import Banner from './Banner'
import About from './About'

import * as Game from '../models/game'

export default class BattleContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      playerIcon: '',
      move: 'waiting',
      player: {},
      opponent: {}
    }
  }

  componentDidMount() {
    this.socket = io();
    this.gameId = sessionStorage.getItem('gameId');
    this.userId = sessionStorage.getItem('userId');

    // populate player and opponent state objects
    this.updatePlayer();
    this.updateOpponent();

    // listen for resolve round broadcast
    this.socket.on('resolve round', gameId => {
      if (gameId === this.gameId) { 
        console.log('time to resolve round');
      }
    });
  }


  handleMove(move) {
    // on move, set icon graphic
    this.setState({playerIcon: getIcon(move)});
    // send move to db with lookup by userId
    Game.playerMove(move, this.userId)
      .then(() => {
        return Promise.all([
          this.updatePlayer(),
          this.updateOpponent()
        ]);
      })
      .then(() => {
        if (this.state.opponent.status === 'waiting') {
          console.log('opponent has not moved yet')
        } else {
          console.log('opponent has moved')
          this.socket.emit('resolve round', this.gameId);
        }
      })
  }

  updatePlayer() {
    return Game.getPlayerById(this.userId)
      .then(data => {
        this.setState({player: data[0]});
        return;
      });
  }

  updateOpponent() {
    return Game.getOpponentByPlayerId(this.userId, this.gameId)
      .then(data => {
        this.setState({opponent: data[0]});
        return;
      });
  }

//------------------------Render------------------------//
//------------------------------------------------------//
  render() {
    return(
      <div>
        {/* placeholder props for round winners for testing */}
        <Banner 
          round1={'player'}
          round2={'opponent'}
          round3={''}
        />

        <div className="players container">
          {/* current player component */}
          <Player
            player={this.state.player}
            handleMove={this.handleMove.bind(this)}
            icon={this.state.playerIcon}
          />
          {/* opponent component */}
          <Mike
            opponent={this.state.opponent}
          />
        </div>

        {/* we should make About a modal */}

        { /* <About /> */ }

    </div>
    );
  }
}

function getIcon(move) {
  if (move === 'rock') {
    return '/images/rock.png';
  } else if (move === 'paper') {
    return '/images/paper.png';
  } else if (move === 'scissors') {
    return '/images/scissors.png'
  }
}
