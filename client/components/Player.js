import React from 'react'

export default class Player extends React.Component {
  render() {
    return (
      <div className="player six columns">
        <div>
          <h5>Player One Nickname</h5>
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
