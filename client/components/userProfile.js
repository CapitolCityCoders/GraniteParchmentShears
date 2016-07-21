import React from 'react';

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    };
  }
 
  render() {
    return (
      <div>
        <h2>{this.props.username} Profile</h2>

      </div>
    )
  }
}