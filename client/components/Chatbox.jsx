import React from 'react';

export default class Chatbox extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: [],
            text    : '',
            username: ''
        };
    }

    componentDidMount() {
        var self = this;
        this.fbUser = sessionStorage.getItem('fbUser');
        this.setState({username: this.fbUser});
        socket.on('Chatbox message',
            function (msg) {
            console.log("socket.on: ", msg);
            self.setState({
                messages: self
                    .state
                    .messages
                    .concat(msg)
            });
        }
        );
    }

    _handleSubmit(event) {

        event.preventDefault();
        socket.emit('Chatbox message', {
            message: this.state.text,
            name   : this.state.username || 'Anon'
        });
        // send request to the socket.io

    }

    render() {
        return (
            <div>
                <Messages messages={this.state.messages}/>
                <form
                    onsubmit={this._handlesubmit.bind(this)}>
                    <input
                        type="text"
                        value={this.state.text}
                        className="u-full-width"
                        placeholder="chat..."
                        id="chatInput"
                        onchange={event => this.setstate({text: event.target.value})}/>
                    <input
                        type="submit"
                        style={{
                        visibility: 'hidden'
                    }}></input>
                </form>
            </div>
        );
    }
}

class Messages extends React.Component {

    _createMessages() {
        return this
            .props
            .messages
            .map((msg, index) => {
                return <Message key={index} name={msg.name} message={msg.message}/>;
            });
    }

    render() {
        return (
            <div className="messages">
                <table className="u-full-width">
                    <tbody>
                        {this._createMessages()}
                    </tbody>
                </table>
            </div>
        );
    }
}

class Message extends React.Component {
    render() {
        return (

            <tr className="message">
                <td>{this.props.name}</td>
                <td>{this.props.message}</td>
            </tr>

        );
    }
}
