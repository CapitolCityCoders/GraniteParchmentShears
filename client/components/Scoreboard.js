import React from 'react'

export default class Banner extends React.Component {
  render() {
    return (
      <div className="status container">
        <div className="scoreboard four columns offset-by-four columns">
          {this.props.winners.map((round, idx, arr) => 
            <div className={'circle ' + round} key={idx}>
              {/* animation for the current round */}
              {idx === this.props.round - 1 ?
                <div className="current"></div> :
                null}
            </div>
          )}
        </div>
      </div>
    );
  }
}
