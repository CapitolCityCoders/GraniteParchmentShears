import React from 'react';
import { Link, browserHistory } from 'react-router';

import Create from './Create';
import Join from './Join';
import * as db from '../models/menu';
import ChatApp from './ChatApp';

export default class Menu extends React.Component{
  constructor(){
    super();
    this.state = {
      accessCode: '',
      username: '',
      view: null, 
    };
  }

  // on mount, check for authentication and save credentials to database
  componentDidMount() {
    let accessToken = sessionStorage.getItem("accessToken");
    let userId = sessionStorage.getItem("userId");
    if (accessToken) {
      this.setState({view: 'menu'});
      db.generateNewSession(userId, accessToken) // add session to db
      .then(function(sessionId) {
        setTimeout(function(){
          let name = sessionStorage.getItem("name");
          let photo_url = sessionStorage.getItem("photo_url");
          let friends = sessionStorage.getItem("friends");
          console.log('hi', 'name', name, 'photo_url', photo_url, 'friends', friends);
          db.createNewUser(userId, name, photo_url, friends) // add user to db
          .then(function(userId) {
            sessionStorage.clear();
            return;
          })
        }, 1000);
      });
    } else {
      this.setState({view: 'loggedOut'});
    }
  }

  // two-way binding for access code input
  handleAccessCodeChange(e) {
    this.setState({accessCode: e.currentTarget.value});
  }

  // two-way binding for username input
  handleUsernameChange(e) {
    this.setState({username: e.currentTarget.value});
  }

  handleViewChange(view, e) {
    e.preventDefault();
    this.setState({view: view});
  }

  _handleLogIn(view, e) {
    document.getElementById('log-in').click();
    this.handleViewChange(view, e)
  }

  _handleLogOut(view, e) { // delete session from database and sessionStorage
    let accessToken = sessionStorage.getItem("accessToken");
    console.log('logout button clicked');
    db.deleteSessionByToken(accessToken)
    .then(function() {
      console.log('backend tells frontend that the session is deleted');
      document.getElementById('log-out').click();
      return;
    });
  }

  // show buttons based on view in state 
  render() {
    return (
      <div className="narrative container six columns offset-by-three">
        <h1>The Rock Shop</h1>
        <hr />
        {
          this.state.view === 'loggedOut'
          ? <div className="button-container">
              <button onClick={this._handleLogIn.bind(this, 'menu')}>Log In</button>
            </div>
          : this.state.view === 'menu'
          ? <div className="button-container">
              <button onClick={this.handleViewChange.bind(this, 'create')}>New Game</button>
              <button onClick={this.handleViewChange.bind(this, 'join')}>Join Game</button>
              <button onClick={this._handleLogOut.bind(this)}>Log Out</button>
            </div>
          : this.state.view === 'create'
          ? <Create 
              username={this.state.username}
              handleUsernameChange={this.handleUsernameChange.bind(this)}
              handleViewChange={this.handleViewChange.bind(this)}
            />
          : this.state.view === 'join'
          ? <Join 
              username={this.state.username}
              accessCode={this.state.accessCode}
              handleUsernameChange={this.handleUsernameChange.bind(this)}
              handleAccessCodeChange={this.handleAccessCodeChange.bind(this)}
              handleViewChange={this.handleViewChange.bind(this)}
            />
          : null
        }
        <div id="status">Loading...</div>
        <hr />
        <div className="chat-app">
          <ChatApp />
        </div>
      </div>
    );
  }
}

