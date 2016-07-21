import React from 'react'
import { Link } from 'react-router'
import ChatApp from './ChatApp.js'

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
      <div className="sidebar narrative container three columns offset-by-nine column vertical">
        <div className="challenge-app">
          <h4>Challenge App will Go here</h4>
        </div>
        <hr />
        <div className="chat-app">
          <ChatApp />
        </div>
      </div>
    );
  }
}