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

  handleMove(move, e) {
    e.preventDefault();
    // on move, set icon graphic
    this.setState({icon: this.getIcon(move)});
    // if move has not been made

    // Commented out if below for ease in testing/production
    // if (this.props.move === 'waiting') {
      // update move
      this.setState({move: move});
      // send move to db with lookup by userId
      Game.playerMove(move, sessionStorage.getItem('userId'));
    // }
  }

//----------------------Resolution Logic-----------------//
//---------------------------------------------------------------//

	// resolveGame function


// compare player 1 status to player 2 status (with Join Table)
	//if player 1 score && player 2 score != 2

		//if player 1 == player 2
			// don't add score
			// reset player statuses to waiting

		// if player 1 beats player 2
			// player 1 score increase
			// reset player statuses to waiting 

		// if player 2 beats player 1
			// player 2 score increase
			// reset player statuses
	// else 
		// if player 1 score == 2 
			// call endGame function (not yet implemented)
			// reset player statuses to waiting
		// if player 2 score == 2
			// call endGame function (not yet implemented)
			// reset player statuses to waiting


//------------------------Render------------------------//
//------------------------------------------------------//
  render() {
    return(
      <div>
        <Scoreboard />
        <Banner />

        <div className="players container">
          {/* current player component */}
          <Player
            handleMove={this.handleMove.bind(this)}
            icon={this.state.playerIcon}
          />
          {/* opponent component */}
          <Mike 
          />
        </div>

        {/* we should make About a modal */}
        <About />
    </div>
    );
  }
}


