import React from 'react'

export default class Banner extends React.Component {
  render() {
    return (
      <div className="status container">
        <div className="scoreboard four columns offset-by-four columns">
          {[this.props.round1,
            this.props.round2,
            this.props.round3].map((round, idx, arr) => 
            <div className={'circle ' + round}>
              {arr[idx] === '' && arr[idx-1] !== '' ?
                <div className="current"></div> :
                null}
            </div>
          )}

          {/*<div className="circle round-one player">
          </div>
          <div className="circle round-two">
            <div className="current"></div>
          </div>
          <div className="circle round-three">
          </div>*/}
        </div>
      </div>
    );
  }
}
