import React from 'react'

export default class Mike extends React.Component {
  render() {
    return (
      <div className="opponent six columns">
        <div>
          <h5>Opponent Nickname</h5>
        </div>
        <div className="arena container">
          <img src = {this.props.icon}/>
        </div>
        <div>
          <button disabled>Rock</button>
          <button disabled>Paper</button>
          <button disabled>Scissors</button>
        </div>
      </div>
    );
  }
}
