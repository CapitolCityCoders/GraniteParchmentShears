import React from 'react'

export default class Banner extends React.Component {
  render() {
    return (
      <div className="status container">
        <div className="scoreboard">
          {/* takes winners array as a prop and adds either 'player' or 
          'opponent' as a class, to color*/}
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
