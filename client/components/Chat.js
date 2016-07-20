import React from 'react';
import BattleChat from './BattleChat'

export default class Chat extends React.Component {

	constructor(){
    super();
    this.state = {
    	messages: [],
    	chatText: ''
    }
  }

  componentDidMount() {
  	var self = this
		socket.on('chat message', function(msg){
			console.log("socket.on: ", msg)
  		self.setState({messages: self.state.messages.concat(msg) })
		});
  }

	render () {
		return (
		    <div className="chatBox">
		      <BattleChat />
          <form>
          	<input value={this.state.chatText}
							onChange={event => this.setState({chatText: event.target.value})}/>
								<button type="button" onClick={() => {
            			console.log("socket.emit: ", this.state.chatText)
            			socket.emit('chat message', this.state.chatText)  }}>send</button>
          </form>
        </div>
    )
	}
}

