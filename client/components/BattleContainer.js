// Shane's BattleContainer
import React from 'react'
var path = require('path');

import { Link } from 'react-router'
import Menu from './Menu'

// TODO: Import Models here

export default class BattleContainer extends React.Component{
  constructor(){
    super();
    this.state = {
      icon: '',
      throw: 'waiting'
    }
  }

//-----------------------Player One Throw Handling-----------------//
//----------------------------------------------------------------//
  getIcon(thrw) {
    if (thrw === 'rock') {
      return '/images/rock.png';
    } else if (thrw === 'paper') {
      return '/images/paper.png';
    } else if (thrw === 'scissors') {
      return '/images/scissors.png'
    }
  }

  handleThrow(thrw, e) {
    e.preventDefault();
    // on throw, set icon graphic
    this.setState({icon: this.getIcon(thrw)});
    // if throw has not been made
    if (this.props.throw !== 'waiting') {
      // update throw
      this.setState({throw: thrw});
      // send throw to db with lookup by userId
      Game.playerThrow(thrw, sessionStorage.getItem('userId'));
    }
  }


//   handleRockThrow1(e){
//    e.preventDefault()
//    this.setState({icon1: '/images/rock.png'});
//     this.setState({p1_throw: 'rock'});

//     Game.player1Throw('rock');


//    //update throw count
//      // this.state.throw ++
//    //check throw count
//      // this.state.throw ?
//    // check if player 2 thrown
//      // Game.check2Throw
//    //send rock status (post) to database for player 1
//  }

//  handlePaperThrow1(e){
//    e.preventDefault()
//    this.setState({icon1: "/images/paper.png" })
//    //send paper status to database for player 1
//  }

//  handleScissorThrow1(e){
//    e.preventDefault()
//    this.setState({icon1:"/images/scissors.png" })
//    //send scissor status to database for player 1
//  }
// //----------------------Player Two Throw Handling-----------------//
// //---------------------------------------------------------------//
//  handleRockThrow2(e){
//    e.preventDefault()
//    this.setState({icon2: "/images/rock.png"})
//    //send rock status to database for player 2
//  }
//  handlePaperThrow2(e){
//    e.preventDefault()
//    this.setState({icon2: "/images/paper.png" })
//    //send paper status to database for player 2
//  }

//  handleScissorThrow2(e){
//    e.preventDefault()
//    this.setState({icon2:"/images/scissors.png" })
//    //send scissor status to database for player 2
//  }

//------------------------Render------------------------//
//------------------------------------------------------//
  render(){
    return(
      <div>

        <div className="rounds container">
          <div className="four columns">
            <div>Round One</div>
          </div>
          <div className="four columns">
            <div>Round Two</div>
          </div>
          <div className="four columns">
            <div>Round Three</div>
          </div>
        </div>

        <div className="status container">
          <div className="four columns offset-by-four columns">GAME INFO</div>
        </div>

        <div className="players container">
          <div className="playerOne six columns">
            <div>
              <h5>Player One Nickname</h5>
            </div>
            <div className="arena container">
              <img src = {this.state.icon}/>
            </div>
            <div>
              <button onClick={this.handleThrow.bind(this, 'rock')}>Rock</button>
              <button onClick={this.handleThrow.bind(this, 'paper')}>Paper</button>
              <button onClick={this.handleThrow.bind(this, 'scissors')}>Scissors</button>
            </div>
          </div>

          <div className="playerTwo six columns">
            <div>
              <h5>Player Two Nickname</h5>
            </div>
            <div className="arena container">
// TODO: display player2 throw when it is made.
              <img src = {this.state.icon2}/>
            </div>
            // <div>
      //       // TODO: change onClick functions below
            //  <button onClick={this.handleRockThrow2.bind(this)}>Rock</button>
            //  <button onClick={this.handlePaperThrow2.bind(this)}>Paper</button>
            //  <button onClick={this.handleScissorThrow2.bind(this)}>Scissors</button>
            // </div>
          </div>
        </div>

      <div className="about">

        <div className="title container">
          <div className="four columns offset-by-four columns">
            <div>ABOUT</div>
          </div>
        </div>

        <div className="devs container">
          <div className="two columns offset-by-one column">
            <div>
              <h6>Amanda's Headshot</h6>
            </div>
            <p>some other stuff</p>
          </div>
          <div className="two columns">
            <div>
              <h6>Kenny's Headshot</h6>
            </div>
            <p>some other stuff</p>
          </div>
          <div className="two columns">
            <div>
              <h6>Mike's Headshot</h6>
            </div>
            <p>some other stuff</p>
          </div>
          <div className="two columns">
            <div>
              <h6>Shane's Headshot</h6>
            </div>
            <p>some other stuff</p>
          </div>
          <div className="two columns">
            <div>
              <h6>Tom's Headshot</h6>
            </div>
            <p>some other stuff</p>
          </div>
        </div>

      </div>
    </div>
    );
  }
}


