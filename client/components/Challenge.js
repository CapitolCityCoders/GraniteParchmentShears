 /* GOALS
  - display list of online users 
  - socket.on connection or look from database????????
  - CHALLENGE button next to user name
    - enable user to challenge any other online user
    - if name matches send game invite
*/

import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

export default class Challenge extends React.Component {
  constructor(props){
    super(props);
    this.state = { onlineUsers: []} ?????????????
  }

  challengeUser = function() {
    
  }

  render() {
    var onlineUsers = this.state.onlineUsers.map((user, index => {
      return 
        <div>
          <img src= {user.imageUrl} />
          <h2> {user.name} </h2>
          <button onSubmit={this.challengeUser.bind(this)}></button>
        </div>
    }))
    return (
      <div>
        {onlineUsers}
      </div>
    );
  }
}


/* react/socket-io video tutorial 
import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

export default class Challenge extends React.Component {
  constructor(props){
    super(props);
    this.state = { messages: []}
  }

  handleSubmit = event => {
    var body = event.target.value
    if (event.keyCode === 13 && body){
      var message = {
        body,
        from: 'Me'
      }
      this.setState({mesages: [message, ...this.state.messages]})
      event.target.value = ''
    }
  }

  render() {
    var messages = this.state.messages.map((message, index => {
      return <li key={index}><b>{message.from}:</b>{message.body}</li>
    }))
    return (
      <div>
        <input type='text' placeholder='Enter a message' onKeyUp={this.handleSubmit}/>
        {messages}
      </div>
    );
  }
}

