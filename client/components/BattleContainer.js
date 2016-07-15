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


    this.updatePlayer();
    this.updateOpponent();
  }

  getIcon(move) {
    if (move === 'rock') {
      return '/images/rock.png';
    } else if (move === 'paper') {
      return '/images/paper.png';
    } else if (move === 'scissors') {
      return '/images/scissors.png'
    }
  }

  handleMove(move, e) {
    e.preventDefault();
    // on move, set icon graphic
    this.setState({playerIcon: this.getIcon(move)});
    // if move has not been made

    // Commented out if below for ease in testing/production
    // if (this.props.move === 'waiting') {
      // update move
      this.setState({move: move});
      // send move to db with lookup by userId
      Game.playerMove(move, sessionStorage.getItem('userId'));
    // }
  }

  updatePlayer() {
    Game.getPlayerById(this.userId)
      .then(data => {
        this.setState({player: data[0]});
      });
  }

  updateOpponent() {
    Game.getOpponentByPlayerId(this.userId, this.gameId)
      .then(data => {
        this.setState({opponent: data[0]});
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


