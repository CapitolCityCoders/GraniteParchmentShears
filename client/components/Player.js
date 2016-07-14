import React from 'react'
import * as Game from '../models/game'

export default class Player extends React.Component {
  constructor(){
    super();
    this.state = {
      player: '',
    }
  }

  componentDidMount(){
    Game.playerById(sessionStorage.getItem('userId'))
      .then((data) => {
        console.log(data)
        this.setState({player: data[0].name})
        console.log(this.state.player)
      })
      console.log("game Id: ",sessionStorage.getItem('gameId'))
  }


  render() {
    return (
      <div className="player six columns">
        <div>
          <h5>{this.state.player}</h5>
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
