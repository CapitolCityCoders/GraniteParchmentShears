import React from 'react';
import ReactD3 from 'react-d3-components';

export default class Graph extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {
   
    var BarChart = ReactD3.BarChart;

    var data = [{
        label: 'somethingA',
        values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
    }];

    return (
      <div>
        <BarChart
               data={data}
               width={200}
               height={200}
               margin={{top: 5, bottom: 5, left: 20, right: 10}}/>
      </div>
        
    )
  }
}



