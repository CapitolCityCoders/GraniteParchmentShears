import React from 'react';
import _ from 'underscore';
import ReactD3 from 'react-d3-components';
import * as db from '../models/menu';


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