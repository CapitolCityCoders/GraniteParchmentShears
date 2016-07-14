// Shane's BattleContainer
import React from 'react'
var path = require('path');

import { Link } from 'react-router'
import Menu from './Menu'
import * as Game from '../models/game'

export default class BattleContainer extends React.Component{
  constructor(){
    super();
    this.state = {
      icon: '',
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
              <button onClick={this.handleMove.bind(this, 'rock')}>Rock</button>
              <button onClick={this.handleMove.bind(this, 'paper')}>Paper</button>
              <button onClick={this.handleMove.bind(this, 'scissors')}>Scissors</button>
            </div>
          </div>

          <div className="playerTwo six columns">
            <div>
              <h5>Player Two Nickname</h5>
            </div>
            <div className="arena container">
            </div>
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


