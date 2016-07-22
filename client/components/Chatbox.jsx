import React from "react"
import moment from 'moment'
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
      imgUrl    : sessionStorage.getItem("imgUrl") || "http://placehold.it/50/55C1E7/fff&text=Anon",
      time: moment()
    })
    // send request to the socket.io
    this.setState({
      text: ""
    })
  }

  render() {

    return (
      <div className="row">
          <Messages messages={this.state.messages}/>
          <form onSubmit={this._handleSubmit.bind(this)}>
              <div className="input-group">
              <input
                type="text"
                className="form-control input-sm"
                onFocus={event => this.value = ""}
                value={this.state.text}
                placeholder="Type your message here..."
                id="btn-input"
                onChange={event => this.setState({text: event.target.value})}
              />
            </div>
          </form>
      </div>
    )
  }
}

class Messages extends React.Component {

  _createMessages() {
    return this.props.messages.map((msg, index) => {
      return <Message
        key={index}
        name={msg.name.substring(0, 15)}
        message={msg.message.substring(0, 151)}
        imgUrl={msg.imgUrl}
        time={msg.time}
        />
    });
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-body">
          <ul className="chat">
            {this._createMessages()}
          </ul>
        </div>
      </div>
    )
  }
}

class Message extends React.Component {
  render() {
    return (
      <li className="left clearfix">
        <span className="chat-img pull-left">
          <img
            height="71"
            width="71"
            src={this.props.imgUrl}
            alt="User Avatar"
            className="img-circle"/>
        </span>
        <div className="chat-body clearfix">
          <div className="header">
            <strong className="primary-font">{this.props.name}</strong>
            <small className="pull-right text-muted">{moment(this.props.time).fromNow()}</small>
          </div>
          <strong className="text-success pull-right">{this.props.message}</strong>
        </div>
      </li>
    )
  }
}
