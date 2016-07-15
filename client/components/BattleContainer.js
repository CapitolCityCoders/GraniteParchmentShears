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
      move: 'waiting'
    }
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

  hasOpponentMoved() {
    // get gameId from session storage
    let gameId = sessionStorage.getItem('gameId');
    let userId = sessionStorage.getItem('userId');

    // send get request to get opponent's move status
    Game.getOpponentMove(gameId, userId)
      .then(response => {
        console.log('39: in BattleContainer: ', response);
      });
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
      Game.playerMove(move, sessionStorage.getItem('userId'))
        .then(

          this.hasOpponentMoved()
          // call Tom's function
        );
    // }

  }



//------------------------Render------------------------//
//------------------------------------------------------//
  render() {
    return(
      <div>
        <Banner />

        <div className="players container">
          {/* current player component */}
          <Player
            handleMove={this.handleMove.bind(this)}
            playerIcon={this.state.playerIcon}
          />
          {/* opponent component */}
          <Mike
          />
        </div>

        {/* we should make About a modal */}

        { /* <About /> */ }

    </div>
    );
  }
}


