import React from 'react'

export default class Mike extends React.Component {
  render() {
    return (
      <div className="playerOne six columns">
        <div>
          <h5>Player One Nickname</h5>
        </div>
        <div className="arena container">
          <img src = {this.props.icon}/>
        </div>
        <div>
          <button>Rock</button>
          <button>Paper</button>
          <button>Scissors</button>
        </div>
      </div>
    );
  }
}
