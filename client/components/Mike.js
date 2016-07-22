import React from 'react'
import * as Game from '../models/game'

export default class Mike extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div className="opponent six columns">
        <div>
          <h5 className='opponent-name'>{this.props.opponent.name}</h5>
        </div>
        <div className="arena container">
          {this.props.icon ?
          <img src = {(this.props.icon).split(".png")[0] + "-opponent.png"}/> :
          this.props.opponent.imageUrl ?
          <img style={{borderRadius : "50%"}} src = {this.props.opponent.imageUrl}/> :
          <img src = "/images/qmark.png"/>}
        </div>
        <div className='opponent-choices'>
          <button className="btn btn-default" disabled>Rock</button>
          <button className="btn btn-default" disabled>Paper</button>
          <button className="btn btn-default" disabled>Scissors</button>
        </div>
      </div>
    );
  }
}
