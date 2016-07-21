import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import * as db from '../models/menu'


export default class Challenge extends React.Component {
  constructor(props){
    super(props);
    this.state = { onlineUsers: []} 
  }

  componentDidMount() {
    setInterval(this.getOnlineUsers.bind(this), 1000);
  }

  getOnlineUsers() {
    var users = [];
    db.getSessions()
    .then(sessions => {
      sessions.forEach(session => {
        db.getUserById(session.user_id)
        .then(user => {
          users.push(user[0]);
        });
      });
      setTimeout(this.setOnlineUsers.bind(this, users), 500);
    })
  }

  setOnlineUsers(users) {
    this.setState({onlineUsers: users});
    console.log('this.state.onlineUsers', this.state.onlineUsers);
  }


  render() {
    return (
      <div>
      <h4>Online Users</h4>
        {
          this.state.onlineUsers
          .map(user => {
            return (
              <div key={user.user_id} className="challenge">
                <img src= {user.photo_url} />
                <span> {user.name} </span>
                <button>CHALLENGE</button>
              </div>
            )
          })
        }
      </div>
    );
  }
}