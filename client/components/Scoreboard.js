import React from 'react'

export default class Scoreboard extends React.Component {
  render() {
    return (
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
    );
  }
}
