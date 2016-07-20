import React from 'react';

export default class Chat extends React.Component {

	constructor(){
    super();
    this.state = {
    	messages: [],
    	chatText: ''
    }
  }

  componentDidMount() {
  	this.gameId = sessionStorage.getItem('gameId');
  	socket.emit('subscribe', this.gameId);
  	var self = this
		socket.on('chat message', function(msg){
			console.log("socket.on: ", msg)
  		self.setState({messages: self.state.messages.concat(msg) })
		});
  }

	render () {
		return (
		    <div className="chatBox">
		      <div className="messages">{this.state.messages.map(function(msg){return (<div>{msg}</div>)})}</div>
          <form>
          	<input value={this.state.chatText}
							onChange={event => this.setState({chatText: event.target.value})}/>
								<button type="button" onClick={() => {
									this.gameId = sessionStorage.getItem('gameId');
  								console.log("uh ", this.gameId)
            			console.log("socket.emit: ", this.state.chatText)
            			socket.emit('send', {room: this.gameId, message: this.state.chatText})}}>send</button>
          </form>
        </div>
    )
	}
}

