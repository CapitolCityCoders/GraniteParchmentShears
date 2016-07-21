import React from 'react';
import io from 'socket.io-client';

class ChatApp extends React.Component {
	constructor(props) {
		super(props)
		this.state = { messages: [] }
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
	  this.socket = io('/')
	  this.socket.on('message', message => {
	  	this.setState({messages: [message, ...this.state.messages] })
	  })  
	}


	handleSubmit(event) {
		const body = event.target.value
		if(event.keyCode === 13 && body) {
			const message = {
				body: body,
				from: 'Me'
			}	
			console.log('this', this)
			this.setState({ messages: [message, ...this.state.messages] })
	  	this.socket.emit('message', body)
			event.target.value = ''
		}
	}

	render () {
		const messages = this.state.messages.map((message, index) => {
			return <li key={index}><b>{message.from}:</b>{message.body}</li>
		})

		return (
			<div>
				<h4>Messages</h4>
				<input type='text' placeholder='enter message...' onKeyUp={this.handleSubmit} />
				{messages}
			</div>
		)
	}
}

export default ChatApp