import React from 'react'
import * as Game from '../models/game'

export default class Mike extends React.Component {
  constructor(){
    super();
    this.state = {
      opponent: '',
    }
  }

  componentDidMount(){
    Game.opponentById(sessionStorage.getItem('userId'),sessionStorage.getItem('gameId'))
      .then((data) => {
        this.setState({opponent: data[0].name})
      })
  }

  render() {
    return (
      <div className="opponent six columns">
        <div>
          <h5>{this.state.opponent}</h5>
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
