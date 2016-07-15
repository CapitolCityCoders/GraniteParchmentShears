import React from 'react'
import * as Game from '../models/game'

export default class Player extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div className="player six columns">
        <div>
          <h5>{this.props.player.name}</h5>
        </div>
        <div className="arena container">
          <img src = {this.props.icon}/>
        </div>
        <div>
          <button onClick={this.props.handleMove.bind(null, 'rock')}>Rock</button>
          <button onClick={this.props.handleMove.bind(null, 'paper')}>Paper</button>
          <button onClick={this.props.handleMove.bind(null, 'scissors')}>Scissors</button>
        </div>
      </div>
    );
  }
}
