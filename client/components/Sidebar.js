import React from 'react'
import { Link } from 'react-router'

import * as db from '../models/menu'

export default class Sidebar extends React.Component{
	constructor() {
    super();
    this.state = {
      players: [],
      gameStatus: ''
    };
  }

  playerStatus(){

  }


render() {
    return (
      <div className="sidebar">
      	<h1> This is sidebar </h1>
      	<ul>
      		<li>{this.state.gameStatus}</li>	
      	</ul>
      </div>
    );
  }
}