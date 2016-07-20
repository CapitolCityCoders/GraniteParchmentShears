import React from 'react'

export default class Chatbox extends React.Component {

  constructor(){
    super();
    this.state = {
      messages: [{name: 'Chris', message: 'this is a test'},{name: 'Kai', message: 'this is a test too'}]
    }
  }

  componentWillMount () {
    //this._fetchComments();
  }

  _handleSubmit(event) {
     event.preventDefault();


    //  this.props.addComment(this._author.value, this._body.value);
     //
    //  this._author.value = '';
    //  this._body.value = '';
     //
    //  this.setState({ characters: 0  });
   }

  render() {
    return (
      <div>
        <Messages messages={this.state.messages}/>
        <input className="u-full-width" placeholder="chat..." id="chatInput"/>
      </div>
    )
  }
}

class Messages extends React.Component {

  _createMessages() {
    return this.props.messages.map((msg, index) => {
      return <Message key={index} name={msg.name} message={msg.message}/>
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
    )
  }
}

class Message extends React.Component {
  render() {
    return (

          <tr className="message">
            <td>{this.props.name}</td>
            <td>{this.props.message}</td>
          </tr>

    )
  }
}
