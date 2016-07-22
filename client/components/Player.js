import React from 'react'
import * as Game from '../models/game'

export default class Player extends React.Component {
  constructor(){
    super();
  }

  render() {
    // trying to see if the prop is getting the url.
    //console.log("showing player.name:", this.props.player);
    console.log("showing player.name:", this.props.player);
    console.log('new');
    return (
      <div className="player six columns">
        <div>
          <h5 className='player-name'>{this.props.player.name}</h5>
        </div>
        <div className="arena container">
          {this.props.icon ?
          <img src = {this.props.icon}/>
          : this.props.player.imageUrl ?
          <img style={{borderRadius : "50%"}} src={this.props.player.imageUrl}/>
          :
          <img src = "/images/qmark.png"/>}
        </div>
        <div className='player-choices'>
          <button className="btn btn-default" onClick={this.props.handleMove.bind(null, 'rock')}>Rock</button>
          <button className="btn btn-default" onClick={this.props.handleMove.bind(null, 'paper')}>Paper</button>
          <button className="btn btn-default" onClick={this.props.handleMove.bind(null, 'scissors')}>Scissors</button>
        </div>
      </div>
    );
  }
}
