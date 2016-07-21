import React from "react"

export default class Chatbox extends React.Component {

  constructor() {
    super();
    this.state = {
      text    : "",
      messages: [],
    }
  }

  componentDidMount() {
    var self = this
    socket.on("Chatbox message", function (msg) {
      self.setState({
        messages: self.state.messages.concat(msg)
      })
    });
  }

  _handleSubmit(event) {
    event.preventDefault();
    socket.emit("Chatbox message", {
      name   : sessionStorage.getItem("fbUser") || "Anon",
      message: this.state.text,
    })
    // send request to the socket.io
    this.setState({
      text: ""
    })
  }

  render() {

    return (
      <div >
        <Messages messages={this.state.messages}/>
        <form className="enclose" onSubmit={this._handleSubmit.bind(this)}>
          <input
            type="text"
            onFocus={event => this.value = ""}
            value={this.state.text}
            className="u-full-width"
            placeholder="chat..."
            id="chatInput"
            onChange={event => this.setState({
            text: event.target.value
          })}/>
          <input type="submit" style={{
            visibility: "hidden"
          }}></input>
        </form>
      </div>
    )
  }
}

class Messages extends React.Component {

  _createMessages() {
    var msgTrim;
    if (this.props.messages.length > 6) {
      msgTrim = this.props.messages.slice(this.props.messages.length - 6);
    } else {
      msgTrim = this.props.messages;
    }
    return msgTrim.map((msg,
    index) => {
      return <Message
        key={index}
        name={msg.name.substring(0, 15)}
        message={msg.message.substring(0, 31)}/>
    });
  }

  render() {
    return (
      <div className="messages">
        <table className="table table-hover">
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
        <td className="text-left">{this.props.name}</td>
        <td className="text-right">{this.props.message}</td>
      </tr>
    )
  }
}
