import React from 'react';
import { Link, browserHistory } from 'react-router';
import _ from 'underscore';
import ReactD3 from 'react-d3-components';
import * as db from '../models/menu';

import ScoresChart from './Stats_ScoresChart';
import WinsChart from './Stats_WinsChart';

export default class Stats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      

    }
  }

  
  render() {

    return (
      <div className="container">
        <div className="row header">
          <div className="col-xs-12">
            <Link to="/"><button className='btn btn-default statsButton'>Back</button></Link> 
            <h1>Leaderboard</h1>
            <hr/>
          </div>
        </div>
        
        <div className="statsContent">
          <div className="row">
            <ScoresChart />
          </div>
          <div className="row">
            <WinsChart />
          </div>

        </div>
      </div>

    )
  }
}
