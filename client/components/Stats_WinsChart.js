import React from 'react';
import _ from 'underscore';
import ReactD3 from 'react-d3-components';
import * as db from '../models/menu';

export default class WinsChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {


    }
  }



  tooltipStacked(x, y0, y, total) {
    //console.log('3~~~~',x,y0,y,total)
    return y.toString();
  }

  render() {

    const BarChart = ReactD3.BarChart;
    const dataStacked = [
    {
    label: 'somethingA',
          values: [
              {x: 'SomethingA', y: 10}, //{x: user1.name, y: user1.wins}
              {x: 'SomethingC', y: 3}//{x: user2.name, y: user2.wins}
          ]
    },
    {
    label: 'somethingB',
          values: [
              {x: 'SomethingA', y: 6},//{x: user1.name, y: user1.losses}
              {x: 'SomethingC', y: 5}//{x: user2.name, y: user2.losses}
          ]
    }   
    ];

    return (
      <div className="col-xs-12 text-center">
          <h3>Top users and their wins and losses</h3>
            
            {
              sessionStorage.getItem('fbUser') ?

              <BarChart
                   data={dataStacked}
                   width={600}
                   height={400}
                   margin={{top: 30, bottom: 30, left: 100, right: 100}}                
                   tooltipHtml={this.tooltipStacked}
                   tooltipMode={'element'}
                   tooltipOffset={{top: 0, left: 0}}
                 />
                 : console.log(sessionStorage.getItem('fbUser'))

            }
      </div>

    )
  }
}
