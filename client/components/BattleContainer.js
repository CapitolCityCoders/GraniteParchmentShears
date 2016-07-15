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
      opponentIcon: '',
      move: 'waiting',
      player: {},
      opponent: {},
      round: 1,
      winners: ['', '', ''],
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
        console.log('time to resolve round')
        // update both player and opponent in order to check winner
        return Promise.all([
          this.updatePlayer(),
          this.updateOpponent()
        ])
          .then(() => {
            this.resolveRound();
          })
      }
    });
  }


  handleMove(move) {
    // on move, set icon graphic
    this.setState({playerIcon: getIcon(move)});
    // send move to db with lookup by userId
    Game.playerMove(move, this.userId)
      // update opponent to check status
      .then(() => {
        return this.updateOpponent();
      })
      // if opponent has moved, socket emit to opponent to resolve round 
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

  resolveRound() {
    const playerMove = this.state.player.status;
    const opponentMove = this.state.opponent.status;
    const result = rpsWinner(playerMove, opponentMove);

    this.setState({opponentIcon: getIcon(opponentMove)});

    if (result === 'tie') {
      console.log('tie')
      setTimeout(this.resetRound.bind(this), 3000);
    } else if (result === 'win') {
      console.log('player wins')
      this.state.winners[this.state.round-1] = 'player';
      this.setState({round: this.state.round + 1});
      setTimeout(this.resetRound.bind(this), 3000);
    } else if (result === 'lose') {
      console.log('opponent wins')
      this.state.winners[this.state.round-1] = 'opponent';
      this.setState({round: this.state.round + 1});
      setTimeout(this.resetRound.bind(this), 3000);
    }
  }

  resetRound() {
    this.setState({
      playerIcon: '',
      opponentIcon: ''
    });
    Game.playerMove('waiting', this.userId).then();
  }

//------------------------Render------------------------//
//------------------------------------------------------//
  render() {
    return(
      <div>
        {/* placeholder props for round winners for testing */}
        <Banner 
          round={this.state.round}
          winners={this.state.winners}
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
            icon={this.state.opponentIcon}
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


// move a wins against move b if the difference is equal to 1 or -2
// tie if 0
function rpsWinner(a, b) {
  const moves = {
    rock: 0,
    paper: 1,
    scissors: 2
  };

  const diff = moves[a] - moves[b];

  return diff === 0 ? 'tie' 
    : diff === 1 || diff === -2 ? 'win'
    : 'lose';
}
