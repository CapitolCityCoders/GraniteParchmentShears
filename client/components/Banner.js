import React from 'react'
//--------------------Round Results------------------//
export default class Banner extends React.Component {
  render() {
    return (
      <div className="status container">
        <div className="banner four columns offset-by-four columns">
          {this.props.status ?
          null :
          <h4>Round {this.props.round}</h4>}
          {this.props.status === 'tie' ?
            <h4>Tie</h4> :
            this.props.status === 'player' ?
            <h4>{this.props.player.name} wins!</h4> :
            this.props.status === 'opponent' ?
            <h4>{this.props.opponent.name} wins!</h4> :
            null}
        </div>
      </div>
    );
  }
}
