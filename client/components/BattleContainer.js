import React from 'react'

import Menu from './Menu'
import Player from './Player'
import Mike from './Mike' // opponent
import Banner from './Banner'
import Scoreboard from './Scoreboard'
import Chat from './Chat'

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
      moveAllowed: true,
      godHand: false
    }
  }

  componentDidMount() {
    this.gameId = sessionStorage.getItem('gameId');
    this.userId = sessionStorage.getItem('userId');
    //populate facebook photo image. either undefined or not.
    this.fbPhoto = sessionStorage.getItem('imgUrl');
    this.fbName = sessionStorage.getItem('fbUser')
    // populate player and opponent state objects
    this.updatePlayer();
    this.updateOpponent();

    // listen for resolve round broadcast
    socket.on('resolve round', gameId => {
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

    // listen for end game broadcast
    socket.on('end game', data => {
      if (data.gameId === this.gameId) {
        setTimeout(this.props.endGame.bind(null, data.winner), 3000);
      }
    });
  }


  handleMove(move) {
    if (this.state.moveAllowed) {
      // on move, set icon graphic
      this.setState({playerIcon: getIcon(move)});
      // send move to db with lookup by userId
      Game.playerMove(move, this.userId, true)
        // update opponent to check status
        .then(() => {
          return this.updateOpponent();
        })
        // if opponent has moved, socket emit to opponent to resolve round
        .then(() => { 

          if (this.state.opponent.status !== 'waiting') {
            // chance for god hands
            const playerMove = Math.random() < .1 ? 'godHand' : move;
            const opponentMove = Math.random() < .1 ? 'godHand' : this.state.opponent.status;
            Promise.all([
              Game.playerMove(playerMove, this.userId, false),
              Game.playerMove(opponentMove, this.state.opponent.id, false)
            ])
              .then(() => {
                socket.emit('resolve round', this.gameId);
              });
          }
        });
    }
  }


  updatePlayer() {
    return Game.getPlayerById(this.userId)
      .then(data => {
        console.log('here is our data,', data)
        //console.log(`${this.userId}: ${data}`);
        // this if checker is a safety net
        if (data[0] !== undefined) {
          this.setState({player: data[0]});
        }
        return;
      });
  }

  updateOpponent() {
    return Game.getOpponentByPlayerId(this.userId, this.gameId)
      .then(data => {
        console.log('here is opponent data:', data)
        this.setState({opponent: data[0]});
        return;
      });
  }

  resolveRound() {
    console.log(this.state.player.score)
    // check winner
    const playerMove = this.state.player.status;
    const opponentMove = this.state.opponent.status;
    let result; 

    if (playerMove === 'godHand' || opponentMove === 'godHand') {
      result = checkGodHand(playerMove, opponentMove);
      this.setState({godHand: true });
    } else {
      result = rpsWinner(playerMove, opponentMove);
    }

    // update icons if changed
    this.setState({playerIcon: getIcon(playerMove)});
    this.setState({opponentIcon: getIcon(opponentMove)});

    if (result === 'tie') {
      // if tie, reset everything but don't increment round
      this.setState({status: 'tie'});
      setTimeout(this.resetRound.bind(this), 3000);
    } else if (result === 'win') {
      this._playerWin();
    } else if (result === 'lose') {
      this._opponentWin();
    }
  }

  //--------reset states for next set of moves-------//
  resetRound() {
    this.setState({
      playerIcon: '',
      opponentIcon: '',
      status: '',
      moveAllowed: true,
      godHand: false
    });
    Game.playerMove('waiting', this.userId).then();
  }

  _playerWin() {
    // set player as winner for banner and scoreboard props, inc round in state
    this.state.winners[this.state.round-1] = 'player';
    this.setState({status: 'player', round: this.state.round + 1});
    // inc score in db by 1
    Game.incPlayerScore(this.userId).then();

    // if current player score is 1 (will be 2 after increment), then end game
    if (this.state.player.score === 1) {
      const playerName = this.state.player.name;
      // emit end game with winner name to the other client
      socket.emit('end game', {
        gameId: this.gameId,
        winner: playerName
      });
      // call end game for current client
      setTimeout(this.props.endGame.bind(null, playerName), 3000);
    // else, reset for next round
    } else {
      setTimeout(this.resetRound.bind(this), 3000);
    }
  }

  _opponentWin() {
    // set opponent as winner for banner and scoreboard props, inc round in state
    this.state.winners[this.state.round-1] = 'opponent';
    this.setState({status: 'opponent', round: this.state.round + 1});
    setTimeout(this.resetRound.bind(this), 3000);
  }


//------------------------Render------------------------//
//------------------------------------------------------//
  render() {
    return(
      <div className="battle">
        <Scoreboard
          round={this.state.round}
          winners={this.state.winners}
        />
        <Banner
          round={this.state.round}
          status={this.state.status}
          player={this.state.player}
          opponent={this.state.opponent}
          godHand={this.state.godHand}
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
        <Chat 
          player={this.state.player}
        />
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
  } else if (move === 'godHand') {
    return '/images/godhands.png'
  }
}

function checkGodHand(a, b) {
  const moves = {
    rock: 0,
    paper: 0,
    scissors: 0,
    godHand: 1
  };

  const diff = moves[a] - moves[b];

  return diff === 0 ? 'tie'
    : diff === 1 ? 'win'
    : 'lose';
}

// move a wins against move b if the difference is equal to 1 or -2
// tie if 0
function rpsWinner(a, b) {
  const moves = {
    rock: 0,
    paper: 1,
    scissors: 2
  };

  // to handle negative numbers in modulo
  const diff = (moves[a] - moves[b] + 3) % 3;

  return diff === 0 ? 'tie'
    : diff === 1 ? 'win'
    : 'lose';
}
