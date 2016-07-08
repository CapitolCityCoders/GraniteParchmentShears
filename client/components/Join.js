import React from 'react'
import { Link } from 'react-router'

export default class Create extends React.Component{
  constructor(){
    super();
    this.state = {
      accessCode: '',
      username: ''
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

  handleSubmit(e) {
    // join lobby
  }

  render() {
    return (
      <form className="join-game">
        <input 
          type="text" 
          autocorrect="off"
          autocapitalize="off"
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
          <button type="submit" onClick={this.handleSubmit.bind(this)}>Join Game</button>
          <Link to="/"><button class="btn-back">Back</button></Link>
        </div>
      </form>
    );
  }
}
