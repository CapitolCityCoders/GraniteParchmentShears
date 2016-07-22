import React from 'react';
import _ from 'underscore';
import ReactD3 from 'react-d3-components';
import * as db from '../models/menu';


export default class Opponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    };
  }
 
  render() {
    
    return (
      <div>
      <li className='media col-md-12 list-group-item' onClick={() => this.props.onVideoSelect(this.props.video)}>
        <div className='row'>
          <div className='col-md-4'>
            <img className='media-object' src= {videoItem.thumbnails.default.url} alt= {videoItem.title} />
          </div>
          <div className='col-md-8'>
            <div className='media-body'>
              <p> {videoItem.title} </p>
            </div>
          </div>
        </div>
      </li>
      </div>
    )
  }
}