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
            			console.log("socket.emit: ", this.state.chatText)
            			socket.emit('chat message', this.state.chatText)}}>send</button>
          </form>
        </div>
    )
	}
}

