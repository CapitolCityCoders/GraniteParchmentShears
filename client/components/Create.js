import React from 'react'
import { Link } from 'react-router'

export default class Create extends React.Component{
  constructor(){
    super();
    this.state = {
      username: ''
    };
  }

  // two-way binding for username input
  handleUsernameChange(e) {
    this.setState({username: e.currentTarget.value});
  }

  handleSubmit(e) {
    // create lobby
  }

  render() {
    return (
      <form className="create-game">
        <input 
          type="text" 
          placeholder="Enter your name"
          value={this.state.username}
          onChange={this.handleUsernameChange.bind(this)}
        />

        <div className="button-container">
          <button type="submit" onClick={this.handleSubmit.bind(this)}>Create Game</button>
          <Link to="/"><button class="btn-back">Back</button></Link>
        </div>
      </form>
    );
  }
}
