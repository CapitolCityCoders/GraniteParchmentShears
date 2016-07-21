import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import * as db from '../models/menu'


export default class Challenge extends React.Component {
  constructor(props){
    super(props);
    this.state = { onlineUsers: []} 
    this.getOnlineUsers = this.getOnlineUsers.bind(this)
  }

  componentDidMount() {
    this.socket = io('/')
    this.socket.on('new user', user => {
      console.log('user in compDidMount: ', user)
      this.setState({onlineUsers: [user, ...this.state.onlineUsers] })
    })  
    console.log('this.state ', this.state)
  }


  getOnlineUsers() {
    console.log('getOnlineUsers Running!')
    db.getSessions()
      .then((sessions)=>console.log('sessions ch:27', sessions))
  }


  render() {
    var onlineUsers = this.state.onlineUsers.map((user, index) => {
      return 
        <div>
          <img src= {user.photo_url} />
          <h2> {user.name} </h2>
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