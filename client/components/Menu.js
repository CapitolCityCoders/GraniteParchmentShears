import React from 'react'
import { Link } from 'react-router'

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

  handleCreate(e) {
    e.preventDefault();
    // create lobby
  }

  handleJoin(e) {
    e.preventDefault();
    // join lobby
  }

  handleViewChange(view, e) {
    e.preventDefault()
    this.setState({view: view});
    console.log(this.state.view)
  }

  menuView() {
    return (
      <div className="button-container">
        <button onClick={this.handleViewChange.bind(this, 'create')}>New Game</button>
        <button onClick={this.handleViewChange.bind(this, 'join')}>Join Game</button>
      </div>
    );
  }

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


  // render links to Create and Join components
  render() {
    return (
      <div className="main-menu">
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
