import React from 'react'
import { Link, browserHistory } from 'react-router'
var io = require('../../node_modules/socket.io-client/socket.io.js')

export default class Menu extends React.Component{
  constructor(){
    super();
    this.state = {
      accessCode: '',
      username: '',
      view: 'menu', 
    };
  }

  // two-way binding for access code input
  handleAccessCodeChange(e) {
    this.setState({accessCode: e.currentTarget.value});
  }

  // two-way binding for username input
  handleUsernameChange(e) {
    this.setState({username: e.currentTarget.value});
  }

  // generate new access code and reroute to there
  handleCreate(e) {
    e.preventDefault();
    const accessCode = this.generateAccessCode();
    // add logic to add new game to database
    console.log(accessCode);
    browserHistory.push(`/${accessCode}`);
  }

  handleJoin(e) {
    e.preventDefault();

    //  initiates socket.io
    var socket = io()

    //  emits player ready to server, which then
    //    emits game ready to all players
    socket.emit('player ready', {
      username: this.state.username,
      accessCode: this.state.accessCode
    })
    // join lobby
  }

  handleViewChange(view, e) {
    e.preventDefault()
    this.setState({view: view});
  }

  // generate random access code of 4 letters
  generateAccessCode() {
    let code = "";
    const possible = "abcdefghijklmnopqrstuvwxyz";
    for(let i = 0; i < 4; i++){
      code += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return code;
  }

  // show main menu buttons
  menuView() {
    return (
      <div className="button-container">
        <button onClick={this.handleViewChange.bind(this, 'create')}>New Game</button>
        <button onClick={this.handleViewChange.bind(this, 'join')}>Join Game</button>
      </div>
    );
  }

  // show create game username input and buttons 
  createView() {
    return (
      <form className="create-game">
        <input 
          type="text" 
          placeholder="Enter your name"
          value={this.state.username}
          onChange={this.handleUsernameChange.bind(this)}
        />

        <div className="button-container">
          <button type="submit" onClick={this.handleCreate.bind(this)}>Create Game</button>
          <button onClick={this.handleViewChange.bind(this, 'menu')}>Back</button>
        </div>
      </form>
    );
  }

  // show join game username and access code input and buttons 
  joinView() {
    return (
      <form className="join-game">
        <input 
          type="text" 
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Enter an access code"
          value={this.state.accessCode}
          onChange={this.handleAccessCodeChange.bind(this)}
        />
        <input 
          type="text" 
          placeholder="Enter your name"
          value={this.state.username}
          onChange={this.handleUsernameChange.bind(this)}
        />

        <div className="button-container">
          <button type="submit" onClick={this.handleJoin.bind(this)}>Join Game</button>
          <button onClick={this.handleViewChange.bind(this, 'menu')}>Back</button>
        </div>
      </form>
    );
  }


  // show buttons based on view in state 
  render() {
    return (
      <div className="container six columns offset-by-three">
        <h1>The Rock Shop</h1>
        <hr />
        {
          this.state.view === 'menu'
          ? this.menuView()
          : this.state.view === 'create'
          ? this.createView()
          : this.state.view === 'join'
          ? this.joinView()
          : null
        }
        <hr />
      </div>
    );
  }
}
