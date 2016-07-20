import React from 'react';

// import * as Menu from '../models/menu';
// import Lobby from './Lobby';
// import BattleContainer from './BattleContainer';
// import End from './End';

export default class BattleContainer extends React.Component {

	constructor(){
    super();
    this.state = {
    	messages: [],
    	chatText: ''
    }
  }

  componentDidMount() {
  	
		socket.on('chat message', function(msg){
			console.log(msg)
  		this.setState({messages: messages.push(msg)})
		});
		
  }

	render () {
		return (
		    <div className="chatBox">
		    <div className="messages">{
		    	this.state.messages.map((msg) =>  {
		    		<div>{msg}</div>
		    	})
		    }</div>
          <form>
          	<input value={this.state.chatText}
							onChange={event => this.setState({chatText: event.target.value})}/>
								<button type="button" onClick={() => {
            			socket.emit('chat message', this.state.chatText)}}>send</button>
          </form>
        </div>
    )
	}
}

