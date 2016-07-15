import React from 'react'

import Menu from './Menu'
import Player from './Player'
// opponent
import Mike from './Mike'
import Banner from './Banner'
import Scoreboard from './Scoreboard'
import About from './About'

import * as Game from '../models/game'

export default class BattleContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      playerIcon: '',
      opponentIcon: '',
      player: {},
      opponent: {},
      round: 1,
      winners: ['', '', ''],
      status: '',
      moveAllowed: true
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
        this.setState({moveAllowed: false});
        // update both player and opponent states before checking for winner
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
    if (this.state.moveAllowed) {
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
          if (this.state.opponent.status !== 'waiting') {
            this.socket.emit('resolve round', this.gameId);
          }
        })
    }
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
    // check winner
    const playerMove = this.state.player.status;
    const opponentMove = this.state.opponent.status;
    const result = rpsWinner(playerMove, opponentMove);

    // show opponent move icon
    this.setState({opponentIcon: getIcon(opponentMove)});

    // if tie, reset everything but don't increment round
    if (result === 'tie') {
      this.setState({status: 'tie'});
      setTimeout(this.resetRound.bind(this), 3000);
    // if player or opponent wins, set winner in winners array for scoreboard to display
    // increment round
    } else if (result === 'win') {
      this.state.winners[this.state.round-1] = 'player';
      this.setState({status: 'player', round: this.state.round + 1});
      setTimeout(this.resetRound.bind(this), 3000);
    } else if (result === 'lose') {
      this.state.winners[this.state.round-1] = 'opponent';
      this.setState({status: 'opponent', round: this.state.round + 1});
      setTimeout(this.resetRound.bind(this), 3000);
    }
  }

  // reset states for next set of moves
  resetRound() {
    this.setState({
      playerIcon: '',
      opponentIcon: '',
      status: '',
      moveAllowed: true
    });
    Game.playerMove('waiting', this.userId).then();
  }


//------------------------Render------------------------//
//------------------------------------------------------//
  render() {
    return(
      <div>
        <Scoreboard 
          round={this.state.round}
          winners={this.state.winners}
        />
        <Banner 
          round={this.state.round}
          status={this.state.status}
          player={this.state.player}
          opponent={this.state.opponent}
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
