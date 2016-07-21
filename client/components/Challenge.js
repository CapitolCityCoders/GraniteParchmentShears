import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

class Challenge extends React.Component {
  constructor(props){
    super(props);
    this.state = { onlineUsers: []} 
    this.handleNewUser = this.handleNewUser.bind(this)
  }


  componentDidMount() {
    this.socket = io('/')
    this.socket.on('new user', user => {
      console.log('user in compDidMount: ', user)
      this.setState({onlineUsers: [user, ...this.state.onlineUsers] })
    })  
    console.log('this.state ', this.state)
  }

  handleNewUser(event) {
      const newUser = {
        username: username,
        imageUrl: imageUrl
      } 
      console.log('this', this)
      this.setState({ onlineUsers: [user, ...this.state.onlineUsers] })
      this.socket.emit('new user', newUser)
  }

  render() {
    var onlineUsers = this.state.onlineUsers.map((user, index) => {
      return 
        <div>
          <img src= {user.imageUrl} />
          <h2> user.name </h2>
          <button>CHALLENGE</button>
        </div>
    })
    return (
      <div>
      <h4>Online Users</h4>
        {onlineUsers}
      </div>
    );
  }
}